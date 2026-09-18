import { Disclosure, DisclosureButton, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt } from '@fortawesome/free-solid-svg-icons';
import useAppStore from '../../../app/store';
import { useCurrentUser, useCurrentUserProfile } from '../../hooks/useCurrentUser';
import NotificationBell from '../../../features/notifications/components/NotificationBell';
import SearchInput from '../molecules/SearchInput';
import Avatar from '../atoms/Avatar';
import Button from '../atoms/Button';

const Navbar = () => {
  const { search, setSearch } = useAppStore();
  const navigate = useNavigate();
  const user = useCurrentUser();
  const userProfile = useCurrentUserProfile();

  const handleLogOut = () => {
    navigate('/giris-yap');
    localStorage.clear();
  };

  return (
    <Disclosure as="nav">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">

          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6" />
            </DisclosureButton>
          </div>

          <div className="flex-shrink-0">
            <Link to="/" className="text-gray-800 font-semibold text-xl flex items-center">
              <FontAwesomeIcon icon={faAppleAlt} className="text-green-500 mr-2 text-3xl" />
              <span className="text-green-500 mr-2 text-2xl" style={{ fontFamily: "'Dancing Script', cursive" }}>Hoşgeldin {user?.result?.firstName}</span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:w-[40vw]">
            <SearchInput
              withIcon
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="default-search"
              className="w-full h-10 px-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-blue-500 focus:outline-none"
              placeholder="Arama..."
            />
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <NotificationBell />
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="flex items-center rounded-full bg-gray-100 p-2 focus:ring-2 focus:ring-white">
                      <Avatar alt="User Profile" src={userProfile?.selectedFile || user?.result?.selectedFile} />
                    </MenuButton>
                  </div>

                  <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <MenuItem>
                      <button
                        className="block w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                        onClick={() => navigate(`/profile/${user.result._id}`)}
                      >
                        Profilime git
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        className="block w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                        onClick={handleLogOut}
                      >
                        Çıkış Yap
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <Button variant="pill" onClick={() => navigate('/giris-yap')}>
                Giriş Yap
              </Button>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
