import type { OrderDetailResponse } from '@/features/order-detail/api/types';

import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

export const getOrderDetail = (orderNumber: string) => {
  return auth.get<ApiResponse<OrderDetailResponse>>(
    END_POINT.ORDER.DETAIL(orderNumber)
  );
};
