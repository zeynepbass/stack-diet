import { useEffect } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Bell } from 'lucide-react';
import useAppStore from '../../../app/store';

const NotificationBell = () => {
  const notifications = useAppStore((state) => state.notifications);
  const error = useAppStore((state) => state.notificationsError);
  const fetchNotifications = useAppStore((state) => state.fetchNotifications);
  const markNotificationRead = useAppStore((state) => state.markNotificationRead);
  const markAllNotificationsRead = useAppStore((state) => state.markAllNotificationsRead);

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <Popover className="relative">
      <PopoverButton
        aria-label="Bildirimler"
        className="relative p-2 rounded-full hover:bg-gray-200 transition focus:outline-none"
      >
        <Bell className="w-6 h-6 text-green-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </PopoverButton>

      <PopoverPanel className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg ring-1 ring-gray-200 z-50">
        <div className="p-4 text-sm text-gray-800">
          <div className="flex items-center justify-between">
            <p className="font-script text-2xl text-green-800">Bildirimler</p>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-green-700 hover:underline"
              >
                Tümünü okundu işaretle
              </button>
            )}
          </div>

          {error && <p className="mt-2 text-red-600">{error}</p>}

          <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto">
            {notifications.map((item) => (
              <li key={item._id} className="border-b pb-2">
                <button
                  onClick={() => markNotificationRead(item._id)}
                  disabled={item.isRead}
                  className={`w-full text-left ${item.isRead ? 'text-gray-500' : 'font-semibold text-gray-800'}`}
                >
                  💬 {item.message}
                </button>
              </li>
            ))}
            {notifications.length === 0 && !error && (
              <li className="text-gray-500">Henüz sana ait bildirim yok.</li>
            )}
          </ul>
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default NotificationBell;
