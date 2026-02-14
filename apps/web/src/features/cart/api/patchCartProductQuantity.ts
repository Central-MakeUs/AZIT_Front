import { auth } from '@/shared/api/apiClient';
import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes.ts';
import type { CartProductUpdateQuantityRequest } from '@/shared/api/models/cart';
import { END_POINT } from '@/shared/constants/endpoint';

export const patchCartProductQuantity = (
  cartItemId: number,
  data: CartProductUpdateQuantityRequest
) => {
  return auth.patch<ApiResponseWithoutResult>(
    END_POINT.CART.PRODUCTS_ITEM_QUANTITY(cartItemId),
    data
  );
};
