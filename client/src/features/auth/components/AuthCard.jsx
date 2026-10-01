import { useEffect } from 'react';
import useAppStore from '../../../app/store';

const AuthCard = ({ title, children }) => {
  const error = useAppStore((state) => state.authError);
  const clearAuthError = useAppStore((state) => state.clearAuthError);

  useEffect(() => clearAuthError, [clearAuthError]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-green-800">{title}</h2>
        {error && (
          <p role="alert" className="text-red-500 text-sm text-center mt-2">
            {error}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
