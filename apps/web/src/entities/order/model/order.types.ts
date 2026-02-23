import type { operations } from '@/shared/api/apiTypes';

import type {
  CheckoutItemDetailResponse,
  CreateOrderRequest,
  DepositAccountInfoResponse,
  OrderDeliveryInfoResponse,
  OrderListResponse,
  OrderSummaryResponse,
  PaymentMethodResponse,
} from './order.model';

import type { DeliveryAddressResponse } from '@/entities/address/model';

/** order.model 타입 가공 */

export type OrderListItem = OrderListResponse;
export type OrderStatus = NonNullable<OrderListItem['status']>;

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

export type OrderItem = CheckoutItemDetailResponse;
export type DeliveryAddress = DeliveryAddressResponse;
export type PaymentMethod = PaymentMethodResponse;
export type DepositAccountInfo = DepositAccountInfoResponse;
export type OrderRequest = CreateOrderRequest;
export type OrderDeliveryInfo = OrderDeliveryInfoResponse;
export type OrderSummary = OrderSummaryResponse;

export type { CreateOrderResponse, OrderItemResponse } from './order.model';
