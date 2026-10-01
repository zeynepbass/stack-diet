import ProfilePostList from '../features/profile/components/ProfilePostList';
import Navbar from '../shared/ui/organisms/Navbar';
import AppAside from './AppAside';

const ProfileLayout = () => (
  <div className="container-fluid mx-auto bg-gray-50 min-h-screen">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
        <div className="col-span-12 md:col-span-8 p-6 bg-white rounded-lg shadow-md">
          <ProfilePostList />
        </div>

        <div className="col-span-12 md:col-span-4 bg-white p-6 rounded-lg shadow-md">
          <AppAside />
        </div>
      </div>
    </div>
  </div>
);

export default ProfileLayout;
