import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import type { CartCountResult } from '@/shared/api/models/cart';
import { END_POINT } from '@/shared/constants/endpoint';

export const getCartCount = () =>
  auth.get<ApiResponse<CartCountResult>>(END_POINT.CART.COUNT);
