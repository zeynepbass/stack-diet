import http from '../../../shared/lib/http';
import { getErrorMessage } from '../../../shared/lib/errors';
import useSessionStore from '../../../shared/store/sessionStore';

export const createAuthSlice = (set) => {
  const submit = async (url, payload) => {
    set({ authLoading: true, authError: null });
    try {
      const { data } = await http.post(url, payload);
      return data;
    } catch (error) {
      set({ authError: getErrorMessage(error) });
      return null;
    } finally {
      set({ authLoading: false });
    }
  };

  const startSession = (session) => {
    if (session) {
      useSessionStore.getState().setSession(session);
    }
    return Boolean(session);
  };

  return {
    authLoading: false,
    authError: null,

    clearAuthError: () => set({ authError: null }),

    login: async (credentials) => startSession(await submit('/auth/login', credentials)),

    register: async (formData) => startSession(await submit('/auth/register', formData)),

    requestPasswordReset: async (email) =>
      Boolean(await submit('/auth/forgot-password', { email })),

    resetPassword: async (formData) => Boolean(await submit('/auth/reset-password', formData)),
  };
};
