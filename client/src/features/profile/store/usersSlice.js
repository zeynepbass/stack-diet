import toast from 'react-hot-toast';
import http from '../../../shared/lib/http';
import { getErrorMessage } from '../../../shared/lib/errors';
import useSessionStore from '../../../shared/store/sessionStore';

export const createUsersSlice = (set) => ({
  users: [],
  usersLoading: false,
  usersError: null,
  profile: null,
  profileError: null,

  fetchUsers: async () => {
    set({ usersLoading: true, usersError: null });
    try {
      const { data } = await http.get('/users');
      set({ users: data });
    } catch (error) {
      set({ usersError: getErrorMessage(error) });
    } finally {
      set({ usersLoading: false });
    }
  },

  fetchProfile: async (userId) => {
    set({ profile: null, profileError: null });
    try {
      const { data } = await http.get(`/users/${userId}`);
      set({ profile: data });
    } catch (error) {
      set({ profileError: getErrorMessage(error) });
    }
  },

  updateAvatar: async (avatar) => {
    const { user, updateUser } = useSessionStore.getState();
    try {
      const { data } = await http.patch(`/users/${user._id}`, { avatar });
      updateUser(data);
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    }
  },
});
