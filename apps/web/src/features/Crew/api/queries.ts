import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query';

import type { UpdateCrewInfoRequest } from '@/shared/api/models/crew';

import { postConfirmJoinStatus } from '../crew-confirm-status/api/postConfirmJoinStatus';
import { postApproveJoinRequest } from '../crew-manage/api/postApproveJoinRequest';
import { postRejectJoinRequest } from '../crew-manage/api/postRejectJoinRequest';

import { deleteCrew } from '@/entities/Crew/api/deleteCrew';
import { deleteCrewMember } from '@/entities/Crew/api/deleteCrewMember';
import { deleteJoinRequest } from '@/entities/Crew/api/deleteJoinRequest';
import { deleteMyCrewMembership } from '@/entities/Crew/api/deleteMyCrewMembership';
import { getCrewDetailInfo } from '@/entities/Crew/api/getCrewDetailInfo';
import { getCrewInfo } from '@/entities/Crew/api/getCrewInfo';
import { getCrewJoinRequests } from '@/entities/Crew/api/getCrewJoinRequests';
import { getCrewJoinStatus } from '@/entities/Crew/api/getCrewJoinStatus';
import { getCrewMembers } from '@/entities/Crew/api/getCrewMembers';
import { postCreateCrew } from '@/entities/Crew/api/postCreateCrew';
import { postJoinCrew } from '@/entities/Crew/api/postJoinCrew';
import { postReissueInvitationCode } from '@/entities/Crew/api/postReissueInvitationCode';
import { updateCrewInfo } from '@/entities/Crew/api/updateCrewInfo';




export const crewQueries = {
  defaultKey: ['crew'] as const,
  joinStatusKey: (crewId: number) =>
    [...crewQueries.defaultKey, 'join-status', crewId] as const,
  crewInfoKey: () => [...crewQueries.defaultKey, 'info'] as const,
  crewDetailInfoKey: (crewId: number) =>
    [...crewQueries.defaultKey, 'detail-info', crewId] as const,
  crewMembersKey: (crewId: number) =>
    [...crewQueries.defaultKey, 'crew-members', crewId] as const,
  joinRequestsKey: (crewId: number) =>
    [...crewQueries.defaultKey, 'join-requests', crewId] as const,
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
  crewMembersQuery: (crewId: number) =>
    infiniteQueryOptions({
      queryKey: crewQueries.crewMembersKey(crewId),
      queryFn: ({ pageParam }) =>
        getCrewMembers(crewId, { cursorId: pageParam }),
      getNextPageParam: (lastPage) => {
        if (!lastPage.result) return undefined;
        const { hasNext, lastId } = lastPage.result;
        return hasNext && lastId ? lastId : undefined;
      },
      initialPageParam: undefined as number | undefined,
      staleTime: 1000 * 60 * 60 * 3,
    }),
  joinRequestsQuery: (crewId: number) =>
    queryOptions({
      queryKey: crewQueries.joinRequestsKey(crewId),
      queryFn: () => getCrewJoinRequests(crewId),
      staleTime: 1000 * 60 * 5,
      refetchInterval: 1000 * 10,
      refetchIntervalInBackground: false,
    }),
  approveJoinRequest: mutationOptions({
    mutationFn: ({
      crewId,
      targetMemberId,
    }: {
      crewId: number;
      targetMemberId: number;
    }) => postApproveJoinRequest(crewId, targetMemberId),
  }),
  rejectJoinRequest: mutationOptions({
    mutationFn: ({
      crewId,
      targetMemberId,
    }: {
      crewId: number;
      targetMemberId: number;
    }) => postRejectJoinRequest(crewId, targetMemberId),
  }),
  deleteCrewMember: mutationOptions({
    mutationFn: ({
      crewId,
      targetMemberId,
    }: {
      crewId: number;
      targetMemberId: number;
    }) => deleteCrewMember(crewId, targetMemberId),
  }),
  deleteJoinRequest: mutationOptions({
    mutationFn: ({ crewId }: { crewId: number }) => deleteJoinRequest(crewId),
  }),
  createCrew: mutationOptions({
    mutationFn: postCreateCrew,
  }),
  joinCrew: mutationOptions({
    mutationFn: postJoinCrew,
  }),
  dissolveCrew: mutationOptions({
    mutationFn: ({ crewId }: { crewId: number }) => deleteCrew(crewId),
  }),
  exitCrew: mutationOptions({
    mutationFn: ({ crewId }: { crewId: number }) =>
      deleteMyCrewMembership(crewId),
  }),
  reissueInvitationCode: mutationOptions({
    mutationFn: ({ crewId }: { crewId: number }) =>
      postReissueInvitationCode(crewId),
  }),
  updateCrewInfo: mutationOptions({
    mutationFn: ({
      crewId,
      ...body
    }: { crewId: number } & UpdateCrewInfoRequest) =>
      updateCrewInfo(crewId, body),
  }),
};
