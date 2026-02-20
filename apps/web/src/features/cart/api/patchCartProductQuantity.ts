import { auth } from '@/shared/api/apiClient';
import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes.ts';
import { END_POINT } from '@/shared/constants/endpoint';

import type { CartProductUpdateQuantityRequest } from '@/entities/cart/model';

export const patchCartProductQuantity = (
  cartItemId: number,
  data: CartProductUpdateQuantityRequest
) => {
  return auth.patch<ApiResponseWithoutResult>(
    END_POINT.CART.PRODUCTS_ITEM_QUANTITY(cartItemId),
    data
  );
};
