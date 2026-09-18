import http from '../../../shared/lib/http';

export const createAuthSlice = () => ({
  fetchRegister: async (formData) => {
    try {
      const response = await http.post('/uye-ol', formData);
      if (response) {
        localStorage.setItem('firstName', JSON.stringify(response.data.result.firstName));
        localStorage.setItem('userRegister', JSON.stringify(response.data.result));
      }
    } catch (error) {
    }
  },

  fetchLogin: async (formData) => {
    try {
      const response = await http.post('/signin', formData);
      if (response) {
        localStorage.setItem('user', JSON.stringify(response.data));
        window.location.href = '/ana-sayfa';
      }
    } catch (error) {
    }
  },

  fetchSifre: async (formData) => {
    try {
      await http.put('/sifre', formData);
    } catch (error) {
    }
  },
});
