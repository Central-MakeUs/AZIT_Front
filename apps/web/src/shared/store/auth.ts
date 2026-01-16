import { create } from 'zustand';

interface AuthState {
  accessToken?: string;
  setAccessToken: (token: string | undefined) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: undefined,
  setAccessToken: (accessToken) => set({ accessToken }),
}));
