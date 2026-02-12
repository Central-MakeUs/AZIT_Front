import { END_POINT } from '@/shared/constants/endpoint';
import { auth } from '@/shared/api/apiClient';

export const postLogout = () => {
  return auth.post(END_POINT.AUTH.LOGOUT, undefined, {
    credentials: 'include',
  });
};
