import { queryOptions } from '@tanstack/react-query';
import { getMyInfo } from '@/pages/my/api/getMyInfo';

export const memberQueries = {
  all: ['member'] as const,
  listKey: () => [...memberQueries.all] as const,
  myInfoQuery: () =>
    queryOptions({
      queryKey: [...memberQueries.listKey(), 'my'] as const,
      queryFn: () => getMyInfo(),
      staleTime: 1000 * 60 * 60 * 3,
    }),
};
