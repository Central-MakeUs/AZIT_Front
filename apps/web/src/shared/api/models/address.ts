import type { components } from '@/shared/api/apiTypes';

export type DeliveryAddressResponse =
  components['schemas']['DeliveryAddressResponse'];
export type DeliveryAddressResult = Required<DeliveryAddressResponse>;
export type DeliveryAddressListResult = Required<DeliveryAddressResponse>[];
export type RegisterDeliveryAddressRequest =
  components['schemas']['RegisterDeliveryAddressRequest'];
export type UpdateDeliveryAddressRequest =
  components['schemas']['UpdateDeliveryAddressRequest'];
