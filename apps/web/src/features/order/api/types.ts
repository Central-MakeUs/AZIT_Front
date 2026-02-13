import type { operations } from '@/shared/api/apiTypes';
import type { DeliveryAddressResponse } from '@/shared/api/models/address';
import type {
  CheckoutItemDetailResponse,
  CreateOrderRequest,
  DepositAccountInfoResponse,
  OrderDeliveryInfoResponse,
  OrderSummaryResponse,
  PaymentMethodResponse,
} from '@/shared/api/models/order';

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
export type {
  CreateOrderResponse,
  OrderItemResponse,
} from '@/shared/api/models/order';
