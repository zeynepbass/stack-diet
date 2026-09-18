import { Routes, Route } from 'react-router-dom';
import LandingPage from '../features/landing/pages/LandingPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import PostList from '../features/posts/components/PostList';
import AppLayout from '../layouts/AppLayout';
import ProfileLayout from '../layouts/ProfileLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/ana-sayfa" element={<AppLayout content={<PostList />} />} />
      <Route path="/profile/:id" element={<ProfileLayout />} />
      <Route path="/giris-yap" element={<LoginPage />} />
      <Route path="/kayit-ol" element={<RegisterPage />} />
      <Route path="/sifremi-unuttum" element={<ForgotPasswordPage />} />
    </Routes>
  );
}

export default App;
