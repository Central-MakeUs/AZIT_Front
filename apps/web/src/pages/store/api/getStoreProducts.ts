import { authApi } from '@/shared/api/apiClient';
import { get } from '@/shared/api/httpMethods';
import type { StoreProductsResponse } from './types';
import { END_POINT } from '@/shared/constants/endpoint';

export const getStoreProducts = () => {
  return get<StoreProductsResponse>(authApi, END_POINT.STORE.PRODUCTS);
};
