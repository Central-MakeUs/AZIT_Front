import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

export const postWithdraw = () => {
  return auth.post<ApiResponse<void>>(END_POINT.AUTH.WITHDRAW, undefined);
};
