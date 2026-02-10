import type { CartProductsResult } from '@/shared/api/models';
import type { ApiResponse } from '@/shared/api/baseTypes';

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
