import { api, createPost, registerUser } from './helpers.js';

const unknownId = '64b7f9f9f9f9f9f9f9f9f9f9';

describe('posts', () => {
  let owner;
  let other;

  beforeEach(async () => {
    owner = await registerUser({ firstName: 'Ayşe' });
    other = await registerUser({ firstName: 'Mehmet' });
  });

  it('requires authentication for every endpoint', async () => {
    const post = await createPost(owner.auth);

    const responses = await Promise.all([
      api.get('/api/posts'),
      api.post('/api/posts').send({ title: 'a', content: 'b' }),
      api.put(`/api/posts/${post._id}`).send({ title: 'a', content: 'b' }),
      api.delete(`/api/posts/${post._id}`),
      api.post(`/api/posts/${post._id}/like`),
      api.post(`/api/posts/${post._id}/comments`).send({ text: 'yorum' }),
    ]);

    expect(responses.map((res) => res.status)).toEqual([401, 401, 401, 401, 401, 401]);
  });

  it('creates a post owned by the current user, ignoring a spoofed author', async () => {
    const res = await api
      .post('/api/posts')
      .set(owner.auth)
      .send({ title: 'Başlık', content: 'İçerik', author: other.user._id });

    expect(res.status).toBe(201);
    expect(res.body.author).toMatchObject({ _id: owner.user._id, firstName: 'Ayşe' });
    expect(res.body.likes).toEqual([]);
  });

  it('rejects an empty title', async () => {
    const res = await api
      .post('/api/posts')
      .set(owner.auth)
      .send({ title: ' ', content: 'İçerik' });

    expect(res.status).toBe(400);
  });

  it('lists posts newest first with populated authors', async () => {
    await createPost(owner.auth, { title: 'ilk' });
    await createPost(other.auth, { title: 'ikinci' });

    const res = await api.get('/api/posts').set(owner.auth);

    expect(res.status).toBe(200);
    expect(res.body.map((post) => post.title)).toEqual(['ikinci', 'ilk']);
    expect(res.body[0].author).toEqual({
      _id: other.user._id,
      firstName: 'Mehmet',
      lastName: 'Yılmaz',
    });
  });

  it('returns 400 for a malformed id and 404 for a missing post', async () => {
    const malformed = await api.get('/api/posts/123').set(owner.auth);
    const missing = await api.get(`/api/posts/${unknownId}`).set(owner.auth);

    expect(malformed.status).toBe(400);
    expect(missing.status).toBe(404);
  });

  it('lets only the owner update a post', async () => {
    const post = await createPost(owner.auth);
    const payload = { title: 'Güncel başlık', content: 'Güncel içerik' };

    const forbidden = await api.put(`/api/posts/${post._id}`).set(other.auth).send(payload);
    const updated = await api.put(`/api/posts/${post._id}`).set(owner.auth).send(payload);

    expect(forbidden.status).toBe(403);
    expect(updated.status).toBe(200);
    expect(updated.body).toMatchObject(payload);
  });

  it('lets only the owner delete a post', async () => {
    const post = await createPost(owner.auth);

    const forbidden = await api.delete(`/api/posts/${post._id}`).set(other.auth);
    const deleted = await api.delete(`/api/posts/${post._id}`).set(owner.auth);
    const after = await api.get(`/api/posts/${post._id}`).set(owner.auth);

    expect(forbidden.status).toBe(403);
    expect(deleted.status).toBe(204);
    expect(after.status).toBe(404);
  });

  it('toggles a like per user instead of counting clicks', async () => {
    const post = await createPost(owner.auth);
    const like = () => api.post(`/api/posts/${post._id}/like`).set(other.auth);

    const first = await like();
    const second = await like();
    await like();
    const third = await api.post(`/api/posts/${post._id}/like`).set(owner.auth);

    expect(first.body.likes).toEqual([other.user._id]);
    expect(second.body.likes).toEqual([]);
    expect(third.body.likes).toHaveLength(2);
  });

  it('adds a comment and notifies the post owner', async () => {
    const post = await createPost(owner.auth);

    const res = await api
      .post(`/api/posts/${post._id}/comments`)
      .set(other.auth)
      .send({ text: 'Harika öneri' });
    const notifications = await api.get('/api/notifications').set(owner.auth);

    expect(res.status).toBe(201);
    expect(res.body.comments).toHaveLength(1);
    expect(res.body.comments[0]).toMatchObject({
      text: 'Harika öneri',
      author: { _id: other.user._id, firstName: 'Mehmet' },
    });
    expect(notifications.body).toHaveLength(1);
    expect(notifications.body[0]).toMatchObject({
      message: 'Mehmet: Harika öneri',
      isRead: false,
      post: post._id,
    });
  });

  it('does not notify users about their own comments', async () => {
    const post = await createPost(owner.auth);

    await api.post(`/api/posts/${post._id}/comments`).set(owner.auth).send({ text: 'Not' });
    const notifications = await api.get('/api/notifications').set(owner.auth);

    expect(notifications.body).toEqual([]);
  });
});
