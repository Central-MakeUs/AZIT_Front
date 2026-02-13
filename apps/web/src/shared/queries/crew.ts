import { getCrewJoinStatus } from '@/pages/crew-join-status/api/getCrewJoinStatus';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { postConfirmJoinStatus } from '@/features/crew-join-status/api/postConfirmJoinStatus';

export const crewQueries = {
  defaultKey: ['crew'] as const,
  joinStatusKey: (crewId: number) =>
    [...crewQueries.defaultKey, 'join-status', crewId] as const,
  joinStatusQuery: (crewId: number) =>
    queryOptions({
      queryKey: [...crewQueries.joinStatusKey(crewId)],
      queryFn: () => getCrewJoinStatus(crewId),
      staleTime: 600000, // 10분
    }),
  confirmJoinStatus: mutationOptions({
    mutationFn: () => postConfirmJoinStatus(),
  }),
};
