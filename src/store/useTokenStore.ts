import { combine } from 'zustand/middleware';
import { create } from 'zustand';
import { STORAGE_KEYS } from '@/constants';

export interface Store {
  accessToken: string;
  refreshToken: string;
}

const getDefaultValues = (): Store => {
  return {
    accessToken: localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN_KEY) || '',
    refreshToken: localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN_KEY) || '',
  };
};

export const useTokenStore = create(
  combine(getDefaultValues(), (set, get) => ({
    setTokens: (x: Store) => {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN_KEY, x.accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN_KEY, x.refreshToken);
      set(x);
    },
    clearTokens: () => {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN_KEY);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN_KEY);
      set({ accessToken: '', refreshToken: '' });
    },
    isAuth: () => !!(get().accessToken && get().refreshToken),
  })),
);

/**
 * TESTS
 */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('getDefaultValues', () => {
    const result = getDefaultValues();
    expect(result.accessToken).toBe('');
    expect(result.refreshToken).toBe('');
  });
}
