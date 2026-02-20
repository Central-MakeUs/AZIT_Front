import type { components } from '@/shared/api/apiTypes';

/** API 스키마 기준 Response/Request 타입만 정의 */

export type CartItemListResponseSchema =
  components['schemas']['CartItemListResponse'];
export type CartItemCountResponseSchema =
  components['schemas']['CartItemCountResponse'];
export type AddToCartRequestSchema = components['schemas']['AddToCartRequest'];
export type CartItemDeleteRequestSchema =
  components['schemas']['CartItemDeleteRequest'];
export type UpdateCartItemQuantityRequestSchema =
  components['schemas']['UpdateCartItemQuantityRequest'];
