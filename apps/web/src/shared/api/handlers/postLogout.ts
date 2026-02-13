import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

export const postLogout = () => {
  return auth.post(END_POINT.AUTH.LOGOUT, undefined, {
    credentials: 'include',
  });
};
