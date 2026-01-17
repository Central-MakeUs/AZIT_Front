import { api } from '@/shared/api/apiClient';

export const getStoreProducts = async () => {
  const response = await api.get('/products');
  return response.json();
};
