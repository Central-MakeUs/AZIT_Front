import { auth } from '@/shared/api/apiClient';
import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes.ts';
import { END_POINT } from '@/shared/constants/endpoint';

import type { CartProductAddRequest } from '@/entities/cart/model';

export const postCartProductAdd = (data: CartProductAddRequest) => {
  return auth.post<ApiResponseWithoutResult>(
    END_POINT.CART.PRODUCTS_ITEM,
    data
  );
};
