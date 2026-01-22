import { create } from 'zustand';

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
    set({
      accessToken: undefined,
      isInitialized: false,
    }),
}));
