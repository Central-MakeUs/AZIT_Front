import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { postConfirmJoinStatus } from '@/features/crew-confirm-status/api/postConfirmJoinStatus';

import { getCrewInfo } from '@/entities/crew/api/getCrewInfo';
import { getCrewJoinStatus } from '@/entities/crew/api/getCrewJoinStatus';

export const crewQueries = {
  defaultKey: ['crew'] as const,
  joinStatusKey: (crewId: number) =>
    [...crewQueries.defaultKey, 'join-status', crewId] as const,
  crewInfoKey: () => [...crewQueries.defaultKey, 'info'] as const,
  joinStatusQuery: (crewId: number) =>
    queryOptions({
      queryKey: [...crewQueries.joinStatusKey(crewId)],
      queryFn: () => getCrewJoinStatus(crewId),
      staleTime: 600000,
    }),
  confirmJoinStatus: mutationOptions({
    mutationFn: () => postConfirmJoinStatus(),
  }),
  crewInfoQuery: (invitationCode: string) =>
    queryOptions({
      queryKey: crewQueries.crewInfoKey(),
      queryFn: () => getCrewInfo(invitationCode),
      staleTime: 600000,
    }),
};
