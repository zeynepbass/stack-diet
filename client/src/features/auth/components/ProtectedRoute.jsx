import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useSessionStore from '../../../shared/store/sessionStore';

const ProtectedRoute = () => {
  const token = useSessionStore((state) => state.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/giris-yap" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
