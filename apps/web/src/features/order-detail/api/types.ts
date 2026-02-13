import type { components } from '@/shared/api/apiTypes';

export type OrderDetailResponse = components['schemas']['OrderDetailResponse'];
export type OrderDetailDeliveryInfo =
  components['schemas']['OrderDetailDeliveryInfoResponse'];

export type OrderStatus = NonNullable<
  components['schemas']['OrderListResponse']['status']
>;
