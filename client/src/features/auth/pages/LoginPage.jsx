import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAppStore from '../../../app/store';
import { useForm } from '../../../shared/hooks/useForm';
import FormField from '../../../shared/ui/molecules/FormField';
import Button from '../../../shared/ui/atoms/Button';
import AuthCard from '../components/AuthCard';
import { validateLogin } from '../validation';

const LoginPage = () => {
  const login = useAppStore((state) => state.login);
  const loading = useAppStore((state) => state.authLoading);
  const navigate = useNavigate();
  const location = useLocation();
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    validateLogin
  );

  const onSubmit = async (credentials) => {
    if (await login(credentials)) {
      navigate(location.state?.from ?? '/ana-sayfa', { replace: true });
    }
  };

  return (
    <AuthCard title="Giriş Yap">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6 mt-4">
        <FormField
          label="E-posta"
          type="email"
          name="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="E-posta adresinizi girin"
        />
        <FormField
          label="Parola"
          type="password"
          name="password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Parola girin"
        />

        <p className="text-sm text-gray-600 text-right underline">
          <Link to="/sifremi-unuttum" className="text-green-600 hover:text-green-500">
            şifremi unuttum
          </Link>
        </p>
        <Button type="submit" disabled={loading}>
          {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Hesabınız yok mu?{' '}
          <Link to="/kayit-ol" className="text-green-600 hover:text-green-500">
            Kayıt Ol
          </Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default LoginPage;
