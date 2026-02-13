import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type { OrderHistoryResponse } from './types';

export const getOrderHistory = (cursorId?: number, size = 10) => {
  const params = cursorId ? { cursorId, size } : { size };
  return auth.get<ApiResponse<OrderHistoryResponse>>(END_POINT.ORDER.HISTORY, {
    searchParams: params,
  });
};
