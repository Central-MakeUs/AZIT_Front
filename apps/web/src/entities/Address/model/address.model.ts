import type { components } from '@/shared/api/apiTypes';

/** API 스키마 기준 Response/Request 타입만 정의 */

export type DeliveryAddressResponse =
  components['schemas']['DeliveryAddressResponse'];
export type DeliveryAddressResponseSchema = DeliveryAddressResponse;
export type RegisterDeliveryAddressRequestSchema =
  components['schemas']['RegisterDeliveryAddressRequest'];
export type UpdateDeliveryAddressRequestSchema =
  components['schemas']['UpdateDeliveryAddressRequest'];
