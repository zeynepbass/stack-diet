import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import useAppStore from '../app/store';
import useSessionStore from '../shared/store/sessionStore';

afterEach(() => {
  cleanup();
  useAppStore.setState(useAppStore.getInitialState(), true);
  useSessionStore.getState().clearSession();
});
