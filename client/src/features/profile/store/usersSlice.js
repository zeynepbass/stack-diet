import http from '../../../shared/lib/http';

export const createUsersSlice = (set) => ({
  usersData: [],

  fetchUsers: async () => {
    try {
      const response = await http.get('/users');
      set({ usersData: response.data });
    } catch (error) {
    }
  },
});
