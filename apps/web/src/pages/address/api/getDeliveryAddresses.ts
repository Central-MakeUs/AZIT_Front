import type { DeliveryAddressListResponse } from '@/pages/address/api/types';

import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

export const getDeliveryAddresses = () => {
  return auth.get<DeliveryAddressListResponse>(END_POINT.ADDRESS.LIST);
};
