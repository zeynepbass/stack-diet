import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../shared/hooks/useCurrentUser';
import ProfilePostList from '../features/profile/components/ProfilePostList';
import AppHeaderTop from './AppHeaderTop';
import AppFooterPanel from './AppFooterPanel';

const ProfileLayout = () => {
  const user = useCurrentUser();

  if (!user) {
    return <Navigate to="/giris-yap" replace />;
  }

  return (
    <div className="container-fluid mx-auto bg-gray-50 min-h-screen dark:bg-gray-900 transition-all">
      <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white transition-all">
        <AppHeaderTop />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          <div className="col-span-12 md:col-span-8 p-6 bg-white rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
            <ProfilePostList />
          </div>

          <div className="col-span-12 md:col-span-4 bg-white p-6 rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
            <AppFooterPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
