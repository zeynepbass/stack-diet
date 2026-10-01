import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSessionStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: ({ token, user }) => set({ token, user }),
      updateUser: (user) => set({ user }),
      clearSession: () => set({ token: null, user: null }),
    }),
    { name: 'stack-diet-session' }
  )
);

export default useSessionStore;
