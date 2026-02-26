import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type {
  DirectOrderCheckoutRequest,
  DirectOrderCheckoutResponse,
} from '@/entities/order/model';

export const getOrderFromDirect = (data: DirectOrderCheckoutRequest) => {
  return auth.get<ApiResponse<DirectOrderCheckoutResponse>>(
    END_POINT.ORDER.CHECKOUT_DIRECT,
    {
      searchParams: {
        skuId: data.skuId,
        quantity: data.quantity,
        deliveryAddressId: data.deliveryAddressId,
      },
    }
  );
};
