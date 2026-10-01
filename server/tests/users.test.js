import { api, createPost, registerUser } from './helpers.js';

const png =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

describe('users', () => {
  let me;
  let other;

  beforeEach(async () => {
    me = await registerUser({ firstName: 'Ayşe' });
    other = await registerUser({ firstName: 'Mehmet' });
  });

  it('never exposes password hashes or emails of other users', async () => {
    const list = await api.get('/api/users').set(me.auth);
    const detail = await api.get(`/api/users/${other.user._id}`).set(me.auth);

    expect(list.status).toBe(200);
    expect(list.body).toHaveLength(2);
    for (const user of [...list.body, detail.body]) {
      expect(user).not.toHaveProperty('password');
      expect(user).not.toHaveProperty('email');
    }
  });

  it('requires authentication', async () => {
    const list = await api.get('/api/users');
    const remove = await api.delete(`/api/users/${me.user._id}`);

    expect(list.status).toBe(401);
    expect(remove.status).toBe(401);
  });

  it('updates only whitelisted fields of the own profile', async () => {
    const res = await api
      .patch(`/api/users/${me.user._id}`)
      .set(me.auth)
      .send({ firstName: 'Elif', avatar: png, email: 'hacked@example.com', password: 'x' });

    const login = await api
      .post('/api/auth/login')
      .send({ email: me.user.email, password: 'parola1234' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ firstName: 'Elif', avatar: png, email: me.user.email });
    expect(login.status).toBe(200);
  });

  it('rejects avatars that are not real images', async () => {
    const svg = await api
      .patch(`/api/users/${me.user._id}`)
      .set(me.auth)
      .send({ avatar: 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=' });
    const fake = await api
      .patch(`/api/users/${me.user._id}`)
      .set(me.auth)
      .send({ avatar: 'data:image/png;base64,PHNjcmlwdD4=' });

    expect(svg.status).toBe(400);
    expect(fake.status).toBe(400);
  });

  it('rejects oversized payloads', async () => {
    const res = await api
      .patch(`/api/users/${me.user._id}`)
      .set(me.auth)
      .send({ avatar: `data:image/png;base64,iVBORw0KGgo${'A'.repeat(3_000_000)}` });

    expect(res.status).toBe(413);
  });

  it("forbids editing or deleting someone else's account", async () => {
    const update = await api
      .patch(`/api/users/${other.user._id}`)
      .set(me.auth)
      .send({ firstName: 'Hacked' });
    const remove = await api.delete(`/api/users/${other.user._id}`).set(me.auth);

    expect(update.status).toBe(403);
    expect(remove.status).toBe(403);
  });

  it('deletes the own account together with its posts and invalidates the token', async () => {
    await createPost(me.auth);
    const othersPost = await createPost(other.auth);
    await api.post(`/api/posts/${othersPost._id}/like`).set(me.auth);

    const remove = await api.delete(`/api/users/${me.user._id}`).set(me.auth);
    const posts = await api.get('/api/posts').set(other.auth);
    const stale = await api.get('/api/auth/me').set(me.auth);

    expect(remove.status).toBe(204);
    expect(posts.body).toHaveLength(1);
    expect(posts.body[0].likes).toEqual([]);
    expect(stale.status).toBe(401);
  });
});
