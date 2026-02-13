import type { ApiResponse } from '@/shared/api/baseTypes';
import type { DeliveryAddressListResult } from '@/shared/api/models/address';

export type DeliveryAddressListResponse =
  ApiResponse<DeliveryAddressListResult>;
