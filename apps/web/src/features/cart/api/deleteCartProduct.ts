import { auth } from '@/shared/api/apiClient';
import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes.ts';
import { END_POINT } from '@/shared/constants/endpoint';

import type { CartProductDeleteRequest } from '@/entities/cart/model';

export const deleteCartProduct = (data: CartProductDeleteRequest) => {
  return auth.delete<ApiResponseWithoutResult>(
    END_POINT.CART.PRODUCTS_ITEM,
    data
  );
};
