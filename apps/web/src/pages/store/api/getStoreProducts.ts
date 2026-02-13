import type { StoreProductsResponse } from '@/pages/store/api/types';

import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

export const getStoreProducts = (cursorId?: number, size = 10) => {
  const params = cursorId ? { cursorId, size } : { size };
  return auth.get<StoreProductsResponse>(END_POINT.STORE.PRODUCTS, {
    searchParams: params,
  });
};
