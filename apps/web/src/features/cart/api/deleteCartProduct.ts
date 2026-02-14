import { auth } from '@/shared/api/apiClient';
import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes.ts';
import type { CartProductDeleteRequest } from '@/shared/api/models/cart';
import { END_POINT } from '@/shared/constants/endpoint';

export const deleteCartProduct = (data: CartProductDeleteRequest) => {
  return auth.delete<ApiResponseWithoutResult>(
    END_POINT.CART.PRODUCTS_ITEM,
    data
  );
};
