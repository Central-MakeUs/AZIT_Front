import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';
import type { CartProductAddRequest } from '@/shared/api/models.ts';
import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes.ts';

export const postCartProductAdd = (data: CartProductAddRequest) => {
  return auth.post<ApiResponseWithoutResult>(
    END_POINT.CART.PRODUCTS_ITEM,
    data
  );
};
