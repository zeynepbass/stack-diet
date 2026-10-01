import request from 'supertest';
import app from '../src/app.js';

export const api = request(app);

let counter = 0;

export const registerUser = async (overrides = {}) => {
  counter += 1;
  const { body } = await api.post('/api/auth/register').send({
    firstName: 'Ayşe',
    lastName: 'Yılmaz',
    email: `user${counter}@example.com`,
    password: 'parola1234',
    confirmPassword: 'parola1234',
    ...overrides,
  });
  return { ...body, auth: { Authorization: `Bearer ${body.token}` } };
};

export const createPost = async (auth, overrides = {}) => {
  const { body } = await api
    .post('/api/posts')
    .set(auth)
    .send({ title: 'Kahvaltı önerisi', content: 'Yulaf ve meyve #kahvaltı', ...overrides });
  return body;
};
