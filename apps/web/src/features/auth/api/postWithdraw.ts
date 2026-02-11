import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';
import type { ApiResponse } from '@/shared/api/baseTypes';

export const postWithdraw = () => {
  return auth.post<ApiResponse<void>>(END_POINT.AUTH.WITHDRAW, undefined);
};
