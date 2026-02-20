import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type { RegisterDeliveryAddressRequest } from '@/entities/address/model';

export const postDeliveryAddress = (
  payload: RegisterDeliveryAddressRequest
) => {
  return auth.post<ApiResponse<void>, RegisterDeliveryAddressRequest>(
    END_POINT.ADDRESS.LIST,
    payload
  );
};
