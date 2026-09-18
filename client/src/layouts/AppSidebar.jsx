import ProfileSummaryCard from '../features/profile/components/ProfileSummaryCard';

const AppSidebar = () => (
  <div className="border-r-2 border-gray-100 md:col-span-2">
    <div className="grid grid-cols-1">
      <ProfileSummaryCard />
    </div>
  </div>
);

export default AppSidebar;
