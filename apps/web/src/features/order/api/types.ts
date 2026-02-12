import type { components, operations } from '@/shared/api/apiTypes';

export type DirectOrderCheckoutRequest =
  operations['getCheckoutInfoDirect']['parameters']['query'];
export type DirectOrderCheckoutResponse = NonNullable<
  operations['getCheckoutInfoDirect']['responses']['200']['content']['*/*']['result']
>;

export type CartOrderCheckoutRequest =
  operations['getCheckoutInfoFromCart']['parameters']['query'];
export type CartOrderCheckoutResponse = NonNullable<
  operations['getCheckoutInfoFromCart']['responses']['200']['content']['*/*']['result']
>;

export type OrderItem = components['schemas']['CheckoutItemDetailResponse'];
export type OrderItemResponse = components['schemas']['OrderItemResponse'];
export type DeliveryAddress = components['schemas']['DeliveryAddressResponse'];
export type PaymentMethod = components['schemas']['PaymentMethodResponse'];
export type DepositAccountInfo =
  components['schemas']['DepositAccountInfoResponse'];
