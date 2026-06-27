import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { postConfirmJoinStatus } from '@/features/Crew/crew-confirm-status/api/postConfirmJoinStatus';

import { getCrewDetailInfo } from '@/entities/Crew/api/getCrewDetailInfo';
import { getCrewInfo } from '@/entities/Crew/api/getCrewInfo';
import { getCrewJoinStatus } from '@/entities/Crew/api/getCrewJoinStatus';

export const crewQueries = {
  defaultKey: ['crew'] as const,
  joinStatusKey: (crewId: number) =>
    [...crewQueries.defaultKey, 'join-status', crewId] as const,
  crewInfoKey: () => [...crewQueries.defaultKey, 'info'] as const,
  crewDetailInfoKey: (crewId: number) =>
    [...crewQueries.defaultKey, 'detail-info', crewId] as const,
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
  crewDetailInfoQuery: (crewId: number) =>
    queryOptions({
      queryKey: crewQueries.crewDetailInfoKey(crewId),
      queryFn: () => getCrewDetailInfo(crewId),
      staleTime: 1000 * 60 * 5,
      select: (data) => data.result,
    }),
};
