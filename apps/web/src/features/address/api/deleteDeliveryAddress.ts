import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';
import type { ApiResponse } from '@/shared/api/baseTypes';

export const deleteDeliveryAddress = (addressId: number) => {
  return auth.delete<ApiResponse<void>>(END_POINT.ADDRESS.DETAIL(addressId));
};
