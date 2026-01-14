import { queryOptions } from '@tanstack/react-query';
import { getStoreProducts } from './getStoreProducts';

// query factory
export const storeQueries = {
  all: ['products'] as const,
  list: () => [...storeQueries.all, 'list'] as const,
  detail: () => [...storeQueries.all, 'detail'] as const,
  productsQuery: () =>
    queryOptions({
      queryKey: [...storeQueries.list()],
      queryFn: () => getStoreProducts(),
      select: () => {},
    }),
  // productDetailQuery: (id: string) =>
  //   queryOptions({
  //     queryKey: [...storeQueries.detail(), id],
  //     queryFn: () => getStoreProductDetail(id),
  //     select: () => {},
  //   }),
};
