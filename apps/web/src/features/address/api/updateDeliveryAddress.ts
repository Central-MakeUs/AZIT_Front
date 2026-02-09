import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';
import type { UpdateDeliveryAddressRequest } from '@/shared/api/models';
import type { ApiResponse } from '@/shared/api/baseTypes';

export const updateDeliveryAddress = (
  addressId: number,
  payload: UpdateDeliveryAddressRequest
) => {
  return auth.put<ApiResponse<void>, UpdateDeliveryAddressRequest>(
    END_POINT.ADDRESS.DETAIL(addressId),
    payload
  );
};
