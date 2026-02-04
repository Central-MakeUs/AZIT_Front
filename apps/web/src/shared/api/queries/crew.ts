import { getCrewJoinStatus } from '@/pages/crew-join-status/api/getCrewJoinStatus';
import { queryOptions } from '@tanstack/react-query';

export const crewQueries = {
  defaultKey: ['crew'] as const,
  joinStatusKey: (crewId: number) =>
    [...crewQueries.defaultKey, 'join-status', crewId] as const,
  joinStatusQuery: (crewId: number) =>
    queryOptions({
      queryKey: [...crewQueries.joinStatusKey(crewId)],
      queryFn: () => getCrewJoinStatus(crewId),
      staleTime: 6000000, // 10분
    }),
};
