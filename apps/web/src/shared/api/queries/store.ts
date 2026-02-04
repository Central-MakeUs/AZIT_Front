import { queryOptions } from '@tanstack/react-query';
import { getStoreProducts } from '@/pages/store/api/getStoreProducts';

// query factory
export const storeQueries = {
  all: ['products'] as const,
  listKey: () => [...storeQueries.all, 'list'] as const,
  detailKey: () => [...storeQueries.all, 'detail'] as const,
  productsQuery: () =>
    queryOptions({
      queryKey: [...storeQueries.listKey()],
      queryFn: () => getStoreProducts(),
    }),
  // productDetailQuery: (id: string) =>
  //   queryOptions({
  //     queryKey: [...storeQueries.detailKey(), id],
  //     queryFn: () => getStoreProductDetail(id),
  //     select: () => {},
  //   }),
};
