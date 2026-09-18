import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../shared/hooks/useCurrentUser';
import AppHeaderTop from './AppHeaderTop';
import AppSidebar from './AppSidebar';
import AppFooterPanel from './AppFooterPanel';

const AppLayout = ({ content }) => {
  const user = useCurrentUser();

  if (!user) {
    return <Navigate to="/giris-yap" replace />;
  }

  return (
    <div className="container-fluid mx-auto px-4">
      <div className="bg-white shadow-sm p-4 mb-6 rounded-md">
        <AppHeaderTop />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-1 md:col-span-2">
          <AppSidebar />
        </div>

        <div className="col-span-1 md:col-span-6 p-4 bg-white shadow-sm rounded-md">
          {content && content}
        </div>

        <div className="col-span-1 md:col-span-4 p-5 bg-white shadow-sm rounded-md">
          <AppFooterPanel />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
