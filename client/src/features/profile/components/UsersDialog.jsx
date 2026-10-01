import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Link } from 'react-router-dom';
import useAppStore from '../../../app/store';
import { useCurrentUser } from '../../../shared/hooks/useCurrentUser';
import SearchInput from '../../../shared/ui/molecules/SearchInput';

const UsersDialog = ({ open, onClose }) => {
  const users = useAppStore((state) => state.users);
  const loading = useAppStore((state) => state.usersLoading);
  const error = useAppStore((state) => state.usersError);
  const fetchUsers = useAppStore((state) => state.fetchUsers);
  const currentUser = useCurrentUser();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (open) {
      fetchUsers();
    }
  }, [open, fetchUsers]);

  const filteredUsers = useMemo(() => {
    const term = searchQuery.trim().toLocaleLowerCase('tr-TR');
    return users.filter(
      (user) =>
        user._id !== currentUser._id &&
        `${user.firstName} ${user.lastName}`.toLocaleLowerCase('tr-TR').includes(term)
    );
  }, [users, currentUser._id, searchQuery]);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-green-900/95" />

      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-lg bg-green-50 p-6 shadow-xl">
          <DialogTitle as="h3" className="text-base font-semibold text-gray-900 border-b pb-2">
            Öneri yapan kullanıcılar
          </DialogTitle>

          <div className="mt-4">
            <SearchInput
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Kullanıcı Ara..."
              className="w-full p-2 border-2 border-green-100 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-50 focus:border-transparent"
            />

            {error && <p className="text-sm text-red-600">{error}</p>}
            {loading && users.length === 0 && <p className="text-gray-500">Yükleniyor...</p>}
            {!loading && !error && filteredUsers.length === 0 && (
              <p className="text-gray-500">Kullanıcı bulunamadı.</p>
            )}

            <ul className="space-y-2 max-h-80 overflow-y-auto">
              {filteredUsers.map((user) => (
                <li key={user._id}>
                  <Link
                    to={`/profil/${user._id}`}
                    onClick={onClose}
                    className="text-green-900 hover:text-green-600 transition-colors"
                  >
                    @{user.firstName} {user.lastName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UsersDialog;
