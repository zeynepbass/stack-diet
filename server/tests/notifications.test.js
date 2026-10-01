import { api, createPost, registerUser } from './helpers.js';

describe('notifications', () => {
  let owner;
  let commenter;
  let notification;

  beforeEach(async () => {
    owner = await registerUser({ firstName: 'Ayşe' });
    commenter = await registerUser({ firstName: 'Mehmet' });

    const post = await createPost(owner.auth);
    await api
      .post(`/api/posts/${post._id}/comments`)
      .set(commenter.auth)
      .send({ text: 'Eline sağlık' });
    await api.post(`/api/posts/${post._id}/comments`).set(commenter.auth).send({ text: 'Denedim' });

    const { body } = await api.get('/api/notifications').set(owner.auth);
    notification = body[0];
  });

  it('returns only the notifications of the current user', async () => {
    const mine = await api.get('/api/notifications').set(owner.auth);
    const theirs = await api.get('/api/notifications').set(commenter.auth);
    const anonymous = await api.get('/api/notifications');

    expect(mine.body).toHaveLength(2);
    expect(mine.body[0].sender).toMatchObject({ firstName: 'Mehmet' });
    expect(theirs.body).toEqual([]);
    expect(anonymous.status).toBe(401);
  });

  it('marks a single notification as read', async () => {
    const res = await api.patch(`/api/notifications/${notification._id}/read`).set(owner.auth);
    const list = await api.get('/api/notifications').set(owner.auth);

    expect(res.status).toBe(200);
    expect(res.body.isRead).toBe(true);
    expect(list.body.filter((item) => item.isRead)).toHaveLength(1);
  });

  it("does not let a user mark someone else's notification", async () => {
    const res = await api.patch(`/api/notifications/${notification._id}/read`).set(commenter.auth);

    expect(res.status).toBe(404);
  });

  it('marks all notifications as read', async () => {
    const res = await api.patch('/api/notifications/read').set(owner.auth);
    const list = await api.get('/api/notifications').set(owner.auth);

    expect(res.status).toBe(204);
    expect(list.body.every((item) => item.isRead)).toBe(true);
  });
});
