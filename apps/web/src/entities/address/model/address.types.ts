import type { ApiResponse } from '@/shared/api/baseTypes';

import type {
  DeliveryAddressResponseSchema,
  RegisterDeliveryAddressRequestSchema,
  UpdateDeliveryAddressRequestSchema,
} from './address.model';

export type DeliveryAddressResult = Required<DeliveryAddressResponseSchema>;
export type DeliveryAddressListResult = DeliveryAddressResult[];
export type DeliveryAddressListResponse =
  ApiResponse<DeliveryAddressListResult>;

export type RegisterDeliveryAddressRequest =
  RegisterDeliveryAddressRequestSchema;
export type UpdateDeliveryAddressRequest = UpdateDeliveryAddressRequestSchema;
