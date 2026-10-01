import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import useSessionStore from '../../../shared/store/sessionStore';
import ProtectedRoute from './ProtectedRoute';

const renderApp = () =>
  render(
    <MemoryRouter initialEntries={['/ana-sayfa']}>
      <Routes>
        <Route path="/giris-yap" element={<p>giriş sayfası</p>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/ana-sayfa" element={<p>korumalı içerik</p>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

describe('ProtectedRoute', () => {
  it('redirects guests to the login page', () => {
    renderApp();

    expect(screen.getByText('giriş sayfası')).toBeInTheDocument();
    expect(screen.queryByText('korumalı içerik')).not.toBeInTheDocument();
  });

  it('renders the page for a signed-in user', () => {
    useSessionStore.getState().setSession({ token: 'jwt-token', user: { _id: '1' } });
    renderApp();

    expect(screen.getByText('korumalı içerik')).toBeInTheDocument();
  });

  it('sends the user back to login as soon as the session is cleared', async () => {
    useSessionStore.getState().setSession({ token: 'jwt-token', user: { _id: '1' } });
    renderApp();

    useSessionStore.getState().clearSession();

    expect(await screen.findByText('giriş sayfası')).toBeInTheDocument();
  });
});
