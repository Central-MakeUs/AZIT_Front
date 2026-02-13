import type { components } from '@/shared/api/apiTypes';

export type StoreProductsResult = Required<
  components['schemas']['SliceResponseProductListResponse']
>;
export type StoreProductItem = StoreProductsResult['content'][number];
export type StoreProductDetailResult = Required<
  components['schemas']['ProductDetailResponse']
>;
