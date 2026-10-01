import { Routes, Route } from 'react-router-dom';
import LandingPage from '../features/landing/pages/LandingPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage';
import ProtectedRoute from '../features/auth/components/ProtectedRoute';
import PostList from '../features/posts/components/PostList';
import AppLayout from '../layouts/AppLayout';
import ProfileLayout from '../layouts/ProfileLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/giris-yap" element={<LoginPage />} />
      <Route path="/kayit-ol" element={<RegisterPage />} />
      <Route path="/sifremi-unuttum" element={<ForgotPasswordPage />} />
      <Route path="/sifre-sifirla/:token" element={<ResetPasswordPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/ana-sayfa"
          element={
            <AppLayout>
              <PostList />
            </AppLayout>
          }
        />
        <Route path="/profil/:id" element={<ProfileLayout />} />
      </Route>
    </Routes>
  );
}

export default App;
