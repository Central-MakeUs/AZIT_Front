import { auth } from '@/shared/api/apiClient';
import type { StoreProductsResponse } from './types';
import { END_POINT } from '@/shared/constants/endpoint';

export const getStoreProducts = () => {
  return auth.get<StoreProductsResponse>(END_POINT.STORE.PRODUCTS);
};
