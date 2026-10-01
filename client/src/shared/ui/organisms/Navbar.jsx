import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Apple } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useAppStore from '../../../app/store';
import NotificationBell from '../../../features/notifications/components/NotificationBell';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import useSessionStore from '../../store/sessionStore';
import SearchInput from '../molecules/SearchInput';
import Avatar from '../atoms/Avatar';

const MENU_ITEM_CLASSES =
  'block w-full px-2 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 focus:outline-none';

const Navbar = () => {
  const search = useAppStore((state) => state.search);
  const setSearch = useAppStore((state) => state.setSearch);
  const clearSession = useSessionStore((state) => state.clearSession);
  const user = useCurrentUser();
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate('/giris-yap');
    clearSession();
  };

  return (
    <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-y-3 min-h-16">
        <Link to="/" className="flex items-center text-green-500">
          <Apple className="mr-2 h-8 w-8" />
          <span className="mr-2 text-2xl font-script">Hoşgeldin {user.firstName}</span>
        </Link>

        <div className="order-last w-full sm:order-none sm:w-[40vw]">
          <SearchInput
            withIcon
            name="search"
            aria-label="Gönderilerde ara"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full h-10 px-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 focus:outline-none"
            placeholder="Arama..."
          />
        </div>

        <div className="flex items-center space-x-4">
          <NotificationBell />
          <Menu as="div" className="relative">
            <MenuButton
              aria-label="Kullanıcı menüsü"
              className="flex items-center rounded-full bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            >
              <Avatar src={user.avatar} name={user.firstName} />
            </MenuButton>

            <MenuItems className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
              <MenuItem>
                <Link to={`/profil/${user._id}`} className={`${MENU_ITEM_CLASSES} text-center`}>
                  Profilime git
                </Link>
              </MenuItem>
              <MenuItem>
                <button className={MENU_ITEM_CLASSES} onClick={handleLogOut}>
                  Çıkış Yap
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
