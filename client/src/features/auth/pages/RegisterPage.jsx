import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAppStore from '../../../app/store';
import FormField from '../../../shared/ui/molecules/FormField';
import Button from '../../../shared/ui/atoms/Button';

const RegisterPage = () => {
  const { fetchRegister } = useAppStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.confirmPassword) {
      setErrorMessage('Lütfen tüm alanları doldurun.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Şifreler uyusmuyor.');
      return;
    }

    await fetchRegister(formData);

    setErrorMessage('Başarılı yönlendiriliyorsunuz :)');
    setTimeout(() => {
      navigate('/giris-yap');
    }, 1000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-green-800">Kayıt Ol</h2>

        {errorMessage && (
          <div className="text-red-500 text-sm text-center mt-2">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <FormField
            label="İsim"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="İsim girin"
            required
          />
          <FormField
            label="Soyisim"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Soyisim girin"
            required
          />
          <FormField
            label="E-posta"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-posta adresinizi girin"
            required
          />
          <FormField
            label="Parola"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Parolanızı girin"
            required
          />
          <FormField
            label="Parola Tekrar"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Parolanızı tekrar girin"
            required
          />

          <Button type="submit">Kayıt Ol</Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Hesabınız var mı?{' '}
            <Link to="/giris-yap" className="text-green-600 hover:text-green-500">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
