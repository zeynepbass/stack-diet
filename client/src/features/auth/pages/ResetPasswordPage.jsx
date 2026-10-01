import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAppStore from '../../../app/store';
import { useForm } from '../../../shared/hooks/useForm';
import FormField from '../../../shared/ui/molecules/FormField';
import Button from '../../../shared/ui/atoms/Button';
import AuthCard from '../components/AuthCard';
import { validateResetPassword } from '../validation';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const resetPassword = useAppStore((state) => state.resetPassword);
  const loading = useAppStore((state) => state.authLoading);
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit } = useForm(
    { password: '', confirmPassword: '' },
    validateResetPassword
  );

  const onSubmit = async (formData) => {
    if (await resetPassword({ token, ...formData })) {
      toast.success('Şifreniz güncellendi, giriş yapabilirsiniz.');
      navigate('/giris-yap', { replace: true });
    }
  };

  return (
    <AuthCard title="Yeni Parola Belirle">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6 mt-4">
        <FormField
          label="Yeni Parola"
          type="password"
          name="password"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Yeni parola girin"
        />
        <FormField
          label="Yeni Parola Tekrar"
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Yeni parolayı tekrar girin"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </form>
    </AuthCard>
  );
};

export default ResetPasswordPage;
