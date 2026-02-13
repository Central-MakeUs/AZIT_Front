import type { ApiResponse } from '@/shared/api/baseTypes';
import type { CartProductsResult } from '@/shared/api/models/cart';

export type CartProductsResponse = ApiResponse<CartProductsResult>;
export type CartProductItem = CartProductsResult[number];
export interface CartBrand {
  id: string;
  name: string;
  items: CartProductItem[];
}
