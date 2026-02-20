import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

import type { StoreProductDetailResponse } from '@/entities/store/model';

export const getStoreProductDetail = (productId: string) => {
  return auth.get<StoreProductDetailResponse>(
    END_POINT.STORE.PRODUCT_DETAIL(Number(productId))
  );
};
