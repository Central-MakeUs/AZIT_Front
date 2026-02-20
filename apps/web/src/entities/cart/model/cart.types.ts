import type { ApiResponse } from '@/shared/api/baseTypes';

import type {
  CartItemCountResponseSchema,
  CartItemListResponseSchema,
  AddToCartRequestSchema,
  CartItemDeleteRequestSchema,
  UpdateCartItemQuantityRequestSchema,
} from './cart.model';

export type CartProductsResult = CartItemListResponseSchema[];
export type CartProductItem = CartProductsResult[number];
export type CartProductsResponse = ApiResponse<CartProductsResult>;

export type CartCountResult = Required<CartItemCountResponseSchema>;
export type CartCountResponse = ApiResponse<CartCountResult>;

export type CartProductAddRequest = AddToCartRequestSchema;
export type CartProductDeleteRequest = CartItemDeleteRequestSchema;
export type CartProductUpdateQuantityRequest =
  UpdateCartItemQuantityRequestSchema;

export interface CartBrand {
  id: string;
  name: string;
  items: CartProductItem[];
}
