import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import http from '../../../shared/lib/http';
import useSessionStore from '../../../shared/store/sessionStore';
import LoginPage from './LoginPage';

const renderLogin = () =>
  render(
    <MemoryRouter initialEntries={['/giris-yap']}>
      <Routes>
        <Route path="/giris-yap" element={<LoginPage />} />
        <Route path="/ana-sayfa" element={<p>ana sayfa</p>} />
      </Routes>
    </MemoryRouter>
  );

const fillAndSubmit = async (email, password) => {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('E-posta'), email);
  await user.type(screen.getByLabelText('Parola'), password);
  await user.click(screen.getByRole('button', { name: 'Giriş Yap' }));
};

describe('LoginPage', () => {
  beforeEach(() => {
    vi.spyOn(http, 'post');
  });

  it('shows validation errors without calling the API', async () => {
    renderLogin();

    await userEvent.click(screen.getByRole('button', { name: 'Giriş Yap' }));

    expect(screen.getByText('Geçerli bir e-posta adresi girin')).toBeInTheDocument();
    expect(screen.getByText('Parola zorunlu')).toBeInTheDocument();
    expect(http.post).not.toHaveBeenCalled();
  });

  it('stores the session and redirects to the home page on success', async () => {
    const session = { token: 'jwt-token', user: { _id: '1', firstName: 'Ayşe' } };
    http.post.mockResolvedValue({ data: session });
    renderLogin();

    await fillAndSubmit('ayse@example.com', 'parola1234');

    expect(await screen.findByText('ana sayfa')).toBeInTheDocument();
    expect(http.post).toHaveBeenCalledWith('/auth/login', {
      email: 'ayse@example.com',
      password: 'parola1234',
    });
    expect(useSessionStore.getState()).toMatchObject(session);
  });

  it('shows the server error and stays on the page when login fails', async () => {
    http.post.mockRejectedValue({ response: { data: { message: 'E-posta veya parola hatalı' } } });
    renderLogin();

    await fillAndSubmit('ayse@example.com', 'yanlis-parola');

    expect(await screen.findByRole('alert')).toHaveTextContent('E-posta veya parola hatalı');
    expect(screen.getByRole('button', { name: 'Giriş Yap' })).toBeEnabled();
    expect(useSessionStore.getState().token).toBeNull();
  });
});
