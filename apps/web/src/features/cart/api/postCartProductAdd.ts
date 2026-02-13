import { auth } from '@/shared/api/apiClient';
import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes.ts';
import type { CartProductAddRequest } from '@/shared/api/models/cart';
import { END_POINT } from '@/shared/constants/endpoint';

export const postCartProductAdd = (data: CartProductAddRequest) => {
  return auth.post<ApiResponseWithoutResult>(
    END_POINT.CART.PRODUCTS_ITEM,
    data
  );
};
