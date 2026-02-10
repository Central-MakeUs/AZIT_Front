import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';
import type { CartProductDeleteRequest } from '@/shared/api/models.ts';
import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes.ts';

export const deleteCartProduct = (data: CartProductDeleteRequest) => {
  return auth.delete<ApiResponseWithoutResult>(
    END_POINT.CART.PRODUCTS_ITEM,
    data
  );
};
