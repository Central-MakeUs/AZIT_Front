import type {
  StoreProductDetailResult,
  StoreProductsResult,
} from '@/shared/api/models';
import type { ApiResponse } from '@/shared/api/baseTypes';

export type StoreProductsResponse = ApiResponse<StoreProductsResult>;
export type StoreProductDetailResponse = ApiResponse<StoreProductDetailResult>;
