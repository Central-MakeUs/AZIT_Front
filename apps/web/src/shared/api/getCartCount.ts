import { END_POINT } from '../constants/endpoint';
import { auth } from './apiClient';
import type { CartCountResult } from './models';
import type { ApiResponse } from './baseTypes';

export const getCartCount = () =>
  auth.get<ApiResponse<CartCountResult>>(END_POINT.CART.COUNT);
