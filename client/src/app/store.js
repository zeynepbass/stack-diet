import { create } from 'zustand';
import { createAuthSlice } from '../features/auth/store/authSlice';
import { createNotificationsSlice } from '../features/notifications/store/notificationsSlice';
import { createPostsSlice } from '../features/posts/store/postsSlice';
import { createUsersSlice } from '../features/profile/store/usersSlice';

const useAppStore = create((...args) => ({
  ...createAuthSlice(...args),
  ...createPostsSlice(...args),
  ...createUsersSlice(...args),
  ...createNotificationsSlice(...args),
}));

export default useAppStore;
