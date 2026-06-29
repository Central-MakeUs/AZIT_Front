import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type { OrderDetailResponse } from '@/entities/CommerceOrder/model';

export const getOrderDetail = (orderNumber: string) => {
  return auth.get<ApiResponse<OrderDetailResponse>>(
    END_POINT.ORDER.DETAIL(orderNumber)
  );
};
