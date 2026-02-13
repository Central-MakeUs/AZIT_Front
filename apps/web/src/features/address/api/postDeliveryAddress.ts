import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import type { RegisterDeliveryAddressRequest } from '@/shared/api/models';
import { END_POINT } from '@/shared/constants/endpoint';

export const postDeliveryAddress = (
  payload: RegisterDeliveryAddressRequest
) => {
  return auth.post<ApiResponse<void>, RegisterDeliveryAddressRequest>(
    END_POINT.ADDRESS.LIST,
    payload
  );
};
