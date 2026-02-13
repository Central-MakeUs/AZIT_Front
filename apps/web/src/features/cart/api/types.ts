import type { ApiResponse } from '@/shared/api/baseTypes';
import type { CartProductsResult } from '@/shared/api/models';

export type CartProductsResponse = ApiResponse<CartProductsResult>;
export type CartProductItem = CartProductsResult['items'][number] & {
  productId?: number;
  productSkuId?: number;
};
export interface CartBrand {
  id: string;
  name: string;
  items: CartProductItem[];
}
