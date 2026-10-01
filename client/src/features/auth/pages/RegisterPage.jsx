import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAppStore from '../../../app/store';
import { useForm } from '../../../shared/hooks/useForm';
import FormField from '../../../shared/ui/molecules/FormField';
import Button from '../../../shared/ui/atoms/Button';
import AuthCard from '../components/AuthCard';
import { validateRegister } from '../validation';

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterPage = () => {
  const register = useAppStore((state) => state.register);
  const loading = useAppStore((state) => state.authLoading);
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit } = useForm(INITIAL_VALUES, validateRegister);

  const onSubmit = async (formData) => {
    if (await register(formData)) {
      toast.success('Aramıza hoş geldin!');
      navigate('/ana-sayfa', { replace: true });
    }
  };

  return (
    <AuthCard title="Kayıt Ol">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6 mt-4">
        <FormField
          label="İsim"
          type="text"
          name="firstName"
          autoComplete="given-name"
          value={values.firstName}
          onChange={handleChange}
          error={errors.firstName}
          placeholder="İsim girin"
        />
        <FormField
          label="Soyisim"
          type="text"
          name="lastName"
          autoComplete="family-name"
          value={values.lastName}
          onChange={handleChange}
          error={errors.lastName}
          placeholder="Soyisim girin"
        />
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
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Parolanızı girin"
        />
        <FormField
          label="Parola Tekrar"
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Parolanızı tekrar girin"
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Hesabınız var mı?{' '}
          <Link to="/giris-yap" className="text-green-600 hover:text-green-500">
            Giriş Yap
          </Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default RegisterPage;
