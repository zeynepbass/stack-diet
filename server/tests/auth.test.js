import { jest } from '@jest/globals';

const sendPasswordResetMail = jest.fn();
jest.unstable_mockModule('../src/lib/mailer.js', () => ({ sendPasswordResetMail }));

const { api, registerUser } = await import('./helpers.js');

const credentials = {
  firstName: 'Zeynep',
  lastName: 'Kaya',
  email: 'zeynep@example.com',
  password: 'parola1234',
  confirmPassword: 'parola1234',
};

describe('POST /api/auth/register', () => {
  it('creates the user and returns a token without the password hash', async () => {
    const res = await api.post('/api/auth/register').send(credentials);

    expect(res.status).toBe(201);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.user).toMatchObject({ firstName: 'Zeynep', email: 'zeynep@example.com' });
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('rejects an email that is already registered', async () => {
    await api.post('/api/auth/register').send(credentials);
    const res = await api
      .post('/api/auth/register')
      .send({ ...credentials, email: 'ZEYNEP@example.com' });

    expect(res.status).toBe(409);
  });

  it('validates the payload', async () => {
    const res = await api
      .post('/api/auth/register')
      .send({ ...credentials, email: 'not-an-email', confirmPassword: 'different' });

    expect(res.status).toBe(400);
    expect(res.body.errors.map((error) => error.field)).toEqual(
      expect.arrayContaining(['email', 'confirmPassword'])
    );
  });
});

describe('POST /api/auth/login', () => {
  beforeEach(() => api.post('/api/auth/register').send(credentials));

  it('logs in with valid credentials', async () => {
    const res = await api
      .post('/api/auth/login')
      .send({ email: credentials.email, password: credentials.password });

    expect(res.status).toBe(200);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('returns the same error for a wrong password and an unknown email', async () => {
    const wrongPassword = await api
      .post('/api/auth/login')
      .send({ email: credentials.email, password: 'yanlis-parola' });
    const unknownEmail = await api
      .post('/api/auth/login')
      .send({ email: 'nobody@example.com', password: credentials.password });

    expect(wrongPassword.status).toBe(401);
    expect(unknownEmail.status).toBe(401);
    expect(unknownEmail.body.message).toBe(wrongPassword.body.message);
  });
});

describe('GET /api/auth/me', () => {
  it('returns the current user', async () => {
    const { user, auth } = await registerUser();
    const res = await api.get('/api/auth/me').set(auth);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(user._id);
  });

  it('rejects missing and malformed tokens', async () => {
    const missing = await api.get('/api/auth/me');
    const malformed = await api.get('/api/auth/me').set('Authorization', 'Bearer not-a-token');

    expect(missing.status).toBe(401);
    expect(malformed.status).toBe(401);
  });
});

describe('password reset', () => {
  const resetTokenFromMail = () => sendPasswordResetMail.mock.calls[0][1].split('/').pop();

  beforeEach(async () => {
    sendPasswordResetMail.mockClear();
    await api.post('/api/auth/register').send(credentials);
  });

  it('does not reveal whether the email exists', async () => {
    const res = await api.post('/api/auth/forgot-password').send({ email: 'nobody@example.com' });

    expect(res.status).toBe(200);
    expect(sendPasswordResetMail).not.toHaveBeenCalled();
  });

  it('changes the password with the mailed token, which works only once', async () => {
    await api.post('/api/auth/forgot-password').send({ email: credentials.email });
    expect(sendPasswordResetMail).toHaveBeenCalledWith(credentials.email, expect.any(String));

    const payload = {
      token: resetTokenFromMail(),
      password: 'yeni-parola-1',
      confirmPassword: 'yeni-parola-1',
    };
    const reset = await api.post('/api/auth/reset-password').send(payload);
    const reuse = await api.post('/api/auth/reset-password').send(payload);
    const oldLogin = await api
      .post('/api/auth/login')
      .send({ email: credentials.email, password: credentials.password });
    const newLogin = await api
      .post('/api/auth/login')
      .send({ email: credentials.email, password: 'yeni-parola-1' });

    expect(reset.status).toBe(200);
    expect(reuse.status).toBe(400);
    expect(oldLogin.status).toBe(401);
    expect(newLogin.status).toBe(200);
  });

  it('rejects an expired token', async () => {
    await api.post('/api/auth/forgot-password').send({ email: credentials.email });
    const token = resetTokenFromMail();

    const { default: User } = await import('../src/models/User.js');
    await User.updateOne({ email: credentials.email }, { resetPasswordExpires: Date.now() - 1000 });

    const res = await api
      .post('/api/auth/reset-password')
      .send({ token, password: 'yeni-parola-1', confirmPassword: 'yeni-parola-1' });

    expect(res.status).toBe(400);
  });

  it('rejects an unknown token', async () => {
    const res = await api
      .post('/api/auth/reset-password')
      .send({ token: 'abc', password: 'yeni-parola-1', confirmPassword: 'yeni-parola-1' });

    expect(res.status).toBe(400);
  });
});
