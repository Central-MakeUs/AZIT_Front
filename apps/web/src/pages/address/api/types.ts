import type { ApiResponse } from '@/shared/api/baseTypes';
import type { DeliveryAddressListResult } from '@/shared/api/models';

export type DeliveryAddressListResponse =
  ApiResponse<DeliveryAddressListResult>;
