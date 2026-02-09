import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';
import type { RegisterDeliveryAddressRequest } from '@/shared/api/models';
import type { ApiResponse } from '@/shared/api/baseTypes';

export const createDeliveryAddress = (
  payload: RegisterDeliveryAddressRequest
) => {
  return auth.post<ApiResponse<void>, RegisterDeliveryAddressRequest>(
    END_POINT.ADDRESS.LIST,
    payload
  );
};
