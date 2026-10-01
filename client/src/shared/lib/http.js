import axios from 'axios';
import useSessionStore from '../store/sessionStore';

const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

http.interceptors.request.use((config) => {
  const { token } = useSessionStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useSessionStore.getState().clearSession();
    }
    return Promise.reject(error);
  }
);

export default http;
