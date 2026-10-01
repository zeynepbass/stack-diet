import Navbar from '../shared/ui/organisms/Navbar';
import AppSidebar from './AppSidebar';
import AppAside from './AppAside';

const AppLayout = ({ children }) => (
  <div className="container-fluid mx-auto px-4">
    <div className="bg-white shadow-sm p-4 mb-6 rounded-md">
      <Navbar />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="col-span-1 md:col-span-2">
        <AppSidebar />
      </div>

      <div className="col-span-1 md:col-span-6 p-4 bg-white shadow-sm rounded-md">{children}</div>

      <div className="col-span-1 md:col-span-4 p-5 bg-white shadow-sm rounded-md">
        <AppAside />
      </div>
    </div>
  </div>
);

export default AppLayout;
