import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import type {
  CartOrderCheckoutRequest,
  CartOrderCheckoutResponse,
} from './types';
import { END_POINT } from '@/shared/constants/endpoint';

export const getCheckoutInfoCart = (data: CartOrderCheckoutRequest) => {
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
