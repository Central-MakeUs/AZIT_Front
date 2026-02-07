import { create } from 'zustand';
import { postLogout } from '../api/postLogout';

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
    postLogout().then((response) => {
      if (response.ok) {
        set({
          accessToken: undefined,
          isInitialized: false,
        });
      }
    }),
}));
