import { auth } from '@/shared/api/apiClient';
import type { StoreProductDetailResponse } from './types';
import { END_POINT } from '@/shared/constants/endpoint';

export const getStoreProductDetail = (productId: string) => {
  return auth.get<StoreProductDetailResponse>(
    END_POINT.STORE.PRODUCT_DETAIL(Number(productId))
  );
};
