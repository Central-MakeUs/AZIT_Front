import type { ApiResponse } from '@/shared/api/baseTypes';
import type {
  StoreProductDetailResult,
  StoreProductsResult,
} from '@/shared/api/models';

export type StoreProductsResponse = ApiResponse<StoreProductsResult>;
export type StoreProductDetailResponse = ApiResponse<StoreProductDetailResult>;
