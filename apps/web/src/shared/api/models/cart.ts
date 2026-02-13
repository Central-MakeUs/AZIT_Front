import type { components } from '@/shared/api/apiTypes';

export type CartProductsResult = Required<
  components['schemas']['CartListResponse']
>;
export type CartProductAddRequest = components['schemas']['AddToCartRequest'];
export type CartProductDeleteRequest =
  components['schemas']['CartItemDeleteRequest'];
export type CartCountResult = Required<
  components['schemas']['CartItemCountResponse']
>;
