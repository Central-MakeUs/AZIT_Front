import { queryOptions } from '@tanstack/react-query';

import { getCartCount } from './getCartCount';

export const cartCountQueries = {
  all: ['cart'] as const,
  countKey: () => [...cartCountQueries.all, 'count'] as const,
  countQuery: () =>
    queryOptions({
      queryKey: [...cartCountQueries.countKey()],
      queryFn: () => getCartCount(),
    }),
};
