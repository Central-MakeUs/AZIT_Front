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
      // queryFn: () => getStoreProducts(),
      queryFn: () => {
        return {
          products: [
            { id: 1, name: 'Product 1' },
            { id: 2, name: 'Product 2' },
          ],
        };
      },
      select: (data) => data.products,
    }),
  // productDetailQuery: (id: string) =>
  //   queryOptions({
  //     queryKey: [...storeQueries.detail(), id],
  //     queryFn: () => getStoreProductDetail(id),
  //     select: () => {},
  //   }),
};
