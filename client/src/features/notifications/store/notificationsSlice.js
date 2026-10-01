import toast from 'react-hot-toast';
import http from '../../../shared/lib/http';
import { getErrorMessage } from '../../../shared/lib/errors';

export const createNotificationsSlice = (set) => ({
  notifications: [],
  notificationsError: null,

  fetchNotifications: async () => {
    try {
      const { data } = await http.get('/notifications');
      set({ notifications: data, notificationsError: null });
    } catch (error) {
      set({ notificationsError: getErrorMessage(error) });
    }
  },

  markNotificationRead: async (notificationId) => {
    try {
      const { data } = await http.patch(`/notifications/${notificationId}/read`);
      set((state) => ({
        notifications: state.notifications.map((item) => (item._id === data._id ? data : item)),
      }));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  },

  markAllNotificationsRead: async () => {
    try {
      await http.patch('/notifications/read');
      set((state) => ({
        notifications: state.notifications.map((item) => ({ ...item, isRead: true })),
      }));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  },
});
