import ky from 'ky';

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
  // 기본값 명시
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  retry: 2,
});
