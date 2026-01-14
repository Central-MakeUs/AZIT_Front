import ky from 'ky';
import { useAuthStore } from './zustand';

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
  // Default Options
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  retry: 2,
  // Interceptor Hooks
  hooks: {
    beforeRequest: [
      (request) => {
        const { accessToken } = useAuthStore.getState();

        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
  },
});
