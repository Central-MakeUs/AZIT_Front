import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query';
import { getStoreProducts } from '@/pages/store/api/getStoreProducts';
import { getStoreProductDetail } from '@/pages/store/api/getStoreProductDetail';

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
  productsInfiniteQuery: () =>
    infiniteQueryOptions({
      queryKey: [...storeQueries.listKey()],
      queryFn: ({ pageParam }) => getStoreProducts(pageParam),
      initialPageParam: undefined as number | undefined,
      getNextPageParam: (lastPage) => {
        if (!lastPage.ok) return undefined;
        const { hasNext, lastId } = lastPage.data.result;
        return hasNext && lastId ? lastId : undefined;
      },
    }),
  productDetailQuery: (id: string) =>
    queryOptions({
      queryKey: [...storeQueries.detailKey(), id],
      queryFn: () => getStoreProductDetail(id),
      select: (data) => (data.ok ? data.data.result : undefined),
    }),
};
