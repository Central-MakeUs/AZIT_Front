import { authApi } from '@/shared/api/apiClient';

export const getStoreProducts = async () => {
  const response = await authApi.get('/products');
  return response.json();
};
