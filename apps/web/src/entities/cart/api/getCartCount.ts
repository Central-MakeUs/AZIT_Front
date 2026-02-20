import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

import type { CartCountResponse } from '@/entities/cart/model';

export const getCartCount = () => {
  return auth.get<CartCountResponse>(END_POINT.CART.COUNT);
};
