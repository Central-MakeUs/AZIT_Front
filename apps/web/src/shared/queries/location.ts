import { queryOptions } from '@tanstack/react-query';

import { normalizeStr } from '../lib/formatters';

import { getLocationSearch } from '@/entities/location/api';

export const locationQueries = {
  all: ['location'] as const,
  searchKey: (query: string) =>
    [...locationQueries.all, 'search', query] as const,
  searchQuery: (query: string) => {
    const normalizedQuery = normalizeStr(query);
    return queryOptions({
      queryKey: locationQueries.searchKey(normalizedQuery),
      queryFn: async () => {
        const res = await getLocationSearch(normalizedQuery);
        if (!res.ok) return [];
        return res.data.result ?? [];
      },
      enabled: !!normalizedQuery,
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
    });
  },
};
