import { create } from 'zustand';

import { postLogout } from '@/shared/api/handlers/postLogout';
import { bridge } from '@/shared/lib/bridge';

interface AuthState {
  accessToken?: string;
  isInitialized: boolean;
  setAccessToken: (token: string | undefined) => void;
  setIsInitialized: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: undefined,
  isInitialized: false,
  setAccessToken: (accessToken) => set({ accessToken }),
  setIsInitialized: (isInitialized) => set({ isInitialized }),
  logout: () =>
    Promise.all([postLogout().catch(() => {}), bridge.logout()]).then(() => {
      set({
        accessToken: undefined,
        isInitialized: false,
      });
    }),
}));
