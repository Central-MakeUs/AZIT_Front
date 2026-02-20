import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

import type { DeliveryAddressListResponse } from '@/entities/address/model';

export const getDeliveryAddresses = () => {
  return auth.get<DeliveryAddressListResponse>(END_POINT.ADDRESS.LIST);
};
