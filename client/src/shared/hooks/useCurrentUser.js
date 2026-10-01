import useSessionStore from '../store/sessionStore';

export function useCurrentUser() {
  return useSessionStore((state) => state.user);
}
