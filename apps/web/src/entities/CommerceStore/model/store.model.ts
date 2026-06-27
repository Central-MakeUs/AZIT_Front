import type { components } from '@/shared/api/apiTypes';

/** API 스키마 기준 Response 타입만 정의 */

export type StoreProductsResponseSchema =
  components['schemas']['SliceResponseProductListResponse'];
export type StoreProductDetailResponseSchema =
  components['schemas']['ProductDetailResponse'];
