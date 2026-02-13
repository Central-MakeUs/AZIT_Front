import { auth } from '@/shared/api/apiClient';
import type { CreateOrderResponse, OrderRequest } from './types';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

export const postOrderCreate = (payload: OrderRequest) =>
  auth.post<ApiResponse<CreateOrderResponse>, OrderRequest>(
    END_POINT.ORDER.CREATE,
    payload
  );
