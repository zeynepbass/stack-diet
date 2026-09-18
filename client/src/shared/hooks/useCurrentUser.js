export function useCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function useCurrentUserProfile() {
  return JSON.parse(localStorage.getItem('userProfile'));
}
