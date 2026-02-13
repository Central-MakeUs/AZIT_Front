import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type { CreateOrderResponse, OrderRequest } from './types';

export const postOrderCreate = (payload: OrderRequest) =>
  auth.post<ApiResponse<CreateOrderResponse>, OrderRequest>(
    END_POINT.ORDER.CREATE,
    payload
  );
