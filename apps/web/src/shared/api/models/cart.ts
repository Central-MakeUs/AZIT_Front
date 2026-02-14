import type { components } from '@/shared/api/apiTypes';

export type CartItemListResponse =
  components['schemas']['CartItemListResponse'];
export type CartProductsResult = CartItemListResponse[];
export type CartProductAddRequest = components['schemas']['AddToCartRequest'];
export type CartProductDeleteRequest =
  components['schemas']['CartItemDeleteRequest'];
export type CartProductUpdateQuantityRequest =
  components['schemas']['UpdateCartItemQuantityRequest'];
export type CartCountResult = Required<
  components['schemas']['CartItemCountResponse']
>;
