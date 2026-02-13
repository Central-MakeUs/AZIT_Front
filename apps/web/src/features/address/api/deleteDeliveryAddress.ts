import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

export const deleteDeliveryAddress = (addressId: number) => {
  return auth.delete<ApiResponse<void>>(
    END_POINT.ADDRESS.DETAIL(addressId),
    undefined
  );
};
