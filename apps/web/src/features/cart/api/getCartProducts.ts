import type { CartProductsResponse } from '@/features/cart/api/types';

import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

export const getCartProducts = () => {
  return auth.get<CartProductsResponse>(END_POINT.CART.PRODUCTS);
};
