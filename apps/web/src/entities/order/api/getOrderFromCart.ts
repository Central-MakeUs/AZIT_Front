import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type {
  CartOrderCheckoutRequest,
  CartOrderCheckoutResponse,
} from '@/entities/order/model';

export const getOrderFromCart = (data: CartOrderCheckoutRequest) => {
  return auth.get<ApiResponse<CartOrderCheckoutResponse>>(
    END_POINT.ORDER.CHECKOUT_CART,
    {
      searchParams: {
        cartItemIds: data.cartItemIds.join(','),
        deliveryAddressId: data.deliveryAddressId,
      },
    }
  );
};
