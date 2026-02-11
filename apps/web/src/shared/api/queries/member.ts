import { postApproveJoinRequest } from '@/features/my/api/postApproveJoinRequest';
import { postRejectJoinRequest } from '@/features/my/api/postRejectJoinRequest';
import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query';
import { getCrewMembers } from '@/pages/my/api/getCrewMembers';
import { getJoinRequests } from '@/pages/my/api/getJoinRequests';
import { getMyInfo } from '@/pages/my/api/getMyInfo';

export const memberQueries = {
  all: ['member'] as const,
  listKey: () => [...memberQueries.all] as const,
  crewMembersKey: (crewId: number) =>
    [...memberQueries.listKey(), 'crew-members', crewId] as const,
  joinRequestsKey: (crewId: number) =>
    [...memberQueries.listKey(), 'join-requests', crewId] as const,
  myInfoQuery: () =>
    queryOptions({
      queryKey: [...memberQueries.listKey(), 'my'] as const,
      queryFn: () => getMyInfo(),
      staleTime: 1000 * 60 * 60 * 3,
    }),
  crewMembersQuery: (crewId: number) =>
    infiniteQueryOptions({
      queryKey: memberQueries.crewMembersKey(crewId),
      queryFn: ({ pageParam }) =>
        getCrewMembers(crewId, { cursorId: pageParam }),
      getNextPageParam: (lastPage) => {
        if (!lastPage.ok) return undefined;
        const { hasNext, lastId } = lastPage.data.result;
        return hasNext && lastId ? lastId : undefined;
      },
      initialPageParam: undefined as number | undefined,
      staleTime: 1000 * 60 * 60 * 3,
    }),
  joinRequestsQuery: (crewId: number) =>
    queryOptions({
      queryKey: memberQueries.joinRequestsKey(crewId),
      queryFn: () => getJoinRequests(crewId),
      staleTime: 1000 * 60 * 5,
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
};
