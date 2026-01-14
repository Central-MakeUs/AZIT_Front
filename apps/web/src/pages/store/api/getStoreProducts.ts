import { api } from '@/shared/lib/ky';

export const getStoreProducts = async () => {
  const response = await api.get('/products');
  return response.json();
};
