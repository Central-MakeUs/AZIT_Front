import type { components } from '@/shared/api/apiTypes';

export type OrderListResponse = components['schemas']['OrderListResponse'];
export type SliceResponseOrderListResponse =
  components['schemas']['SliceResponseOrderListResponse'];

export type CheckoutItemDetailResponse =
  components['schemas']['CheckoutItemDetailResponse'];
export type OrderItemResponse = components['schemas']['OrderItemResponse'];
export type PaymentMethodResponse =
  components['schemas']['PaymentMethodResponse'];
export type DepositAccountInfoResponse =
  components['schemas']['DepositAccountInfoResponse'];
export type CreateOrderRequest = components['schemas']['CreateOrderRequest'];
export type CreateOrderResponse = components['schemas']['CreateOrderResponse'];
export type OrderDeliveryInfoResponse =
  components['schemas']['OrderDeliveryInfoResponse'];
export type OrderSummaryResponse =
  components['schemas']['OrderSummaryResponse'];

export type OrderDetailResponse = components['schemas']['OrderDetailResponse'];
export type OrderDetailDeliveryInfoResponse =
  components['schemas']['OrderDetailDeliveryInfoResponse'];
