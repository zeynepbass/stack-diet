import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../../../app/store';
import FormField from '../../../shared/ui/molecules/FormField';
import Button from '../../../shared/ui/atoms/Button';

const ForgotPasswordPage = () => {
  const { fetchSifre } = useAppStore();
  const [formData, setFormData] = useState({ email: '', newPassword: '', confirmPassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.newPassword || !formData.confirmPassword) {
      setErrorMessage('Lütfen tüm alanları doldurun.');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage('Şifreler uyuşmuyor.');
      return;
    }

    fetchSifre(formData);

    setErrorMessage('Başarılı yönlendiriliyorsunuz :)');
    setTimeout(() => {
      navigate('/giris-yap');
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-green-800">Şifremi Unuttum</h2>

        {errorMessage && (
          <div className="text-red-500 text-sm text-center mt-2">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <FormField
            label="Email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email girin"
            required
          />
          <FormField
            label="Yeni Parola"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Yeni parola girin"
            required
          />
          <FormField
            label="Yeni Parolayı Tekrar Girin"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Yeni tekrar girin"
            required
          />

          <Button type="submit">Kaydet</Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
