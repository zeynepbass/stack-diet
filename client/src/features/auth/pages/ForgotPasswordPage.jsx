import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAppStore from '../../../app/store';
import { useForm } from '../../../shared/hooks/useForm';
import FormField from '../../../shared/ui/molecules/FormField';
import Button from '../../../shared/ui/atoms/Button';
import AuthCard from '../components/AuthCard';
import { validateForgotPassword } from '../validation';

const ForgotPasswordPage = () => {
  const requestPasswordReset = useAppStore((state) => state.requestPasswordReset);
  const loading = useAppStore((state) => state.authLoading);
  const [sent, setSent] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '' },
    validateForgotPassword
  );

  const onSubmit = async ({ email }) => {
    setSent(await requestPasswordReset(email));
  };

  return (
    <AuthCard title="Şifremi Unuttum">
      {sent ? (
        <p className="text-sm text-gray-700 text-center mt-4">
          Bu adres kayıtlıysa şifre sıfırlama bağlantısı e-posta ile gönderildi. Bağlantı 1 saat
          boyunca geçerlidir.
        </p>
      ) : (
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
          <Button type="submit" disabled={loading}>
            {loading ? 'Gönderiliyor...' : 'Sıfırlama Bağlantısı Gönder'}
          </Button>
        </form>
      )}

      <p className="mt-4 text-center text-sm">
        <Link to="/giris-yap" className="text-green-600 hover:text-green-500">
          Giriş sayfasına dön
        </Link>
      </p>
    </AuthCard>
  );
};

export default ForgotPasswordPage;
