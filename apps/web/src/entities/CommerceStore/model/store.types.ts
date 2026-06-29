import type { ApiResponse } from '@/shared/api/baseTypes';

import type {
  StoreProductDetailResponseSchema,
  StoreProductsResponseSchema,
} from './store.model';

export type StoreProductsResult = Required<StoreProductsResponseSchema>;
export type StoreProductItem = StoreProductsResult['content'][number];
export type StoreProductDetailResult =
  Required<StoreProductDetailResponseSchema>;

export type StoreProductsResponse = ApiResponse<StoreProductsResult>;
export type StoreProductDetailResponse = ApiResponse<StoreProductDetailResult>;
