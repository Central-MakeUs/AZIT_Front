import type {
  DirectOrderCheckoutRequest,
  DirectOrderCheckoutResponse,
} from '@/features/order/api/types';

import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

export const getCheckoutInfoDirect = (data: DirectOrderCheckoutRequest) => {
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
