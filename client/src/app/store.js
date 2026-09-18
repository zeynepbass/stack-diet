import { create } from 'zustand';
import { createAuthSlice } from '../features/auth/store/authSlice';
import { createPostsSlice } from '../features/posts/store/postsSlice';
import { createUsersSlice } from '../features/profile/store/usersSlice';

const useAppStore = create((set, get) => ({
  ...createAuthSlice(set, get),
  ...createPostsSlice(set, get),
  ...createUsersSlice(set, get),
}));

export default useAppStore;
