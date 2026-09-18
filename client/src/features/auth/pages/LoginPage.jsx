import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAppStore from '../../../app/store';
import FormField from '../../../shared/ui/molecules/FormField';
import Button from '../../../shared/ui/atoms/Button';

const LoginPage = () => {
  const { fetchLogin } = useAppStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage('Lütfen tüm alanları doldurun.');
      return;
    }

    await fetchLogin(formData);
    setErrorMessage('');
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
        <h2 className="text-2xl font-semibold text-center text-green-800">       Giriş Yap</h2>

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
            label="Parola"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Parola girin"
            required
          />

          <p className="text-sm text-gray-600 text-right underline">
            <Link to="/sifremi-unuttum" className="text-green-600 hover:text-green-500">
              şifremi unuttum
            </Link>
          </p>
          <Button type="submit">Giriş Yap</Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Hesabınız yok mu?{' '}
            <Link to="/kayit-ol" className="text-green-600 hover:text-green-500">
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
