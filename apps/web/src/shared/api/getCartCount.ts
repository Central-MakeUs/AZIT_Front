import { auth } from './apiClient';
import type { ApiResponse } from './baseTypes';
import type { CartCountResult } from './models';
import { END_POINT } from '../constants/endpoint';

export const getCartCount = () =>
  auth.get<ApiResponse<CartCountResult>>(END_POINT.CART.COUNT);
