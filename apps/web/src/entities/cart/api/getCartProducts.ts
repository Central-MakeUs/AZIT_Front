import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

import type { CartProductsResponse } from '@/entities/cart/model';

export const getCartProducts = () => {
  return auth.get<CartProductsResponse>(END_POINT.CART.PRODUCTS);
};
