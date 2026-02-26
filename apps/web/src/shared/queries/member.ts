import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query';

import { postApproveJoinRequest } from '@/features/crew-manage/api/postApproveJoinRequest';
import { postRejectJoinRequest } from '@/features/crew-manage/api/postRejectJoinRequest';

import { deleteCrewMember } from '@/entities/crew/api/deleteCrewMember';
import { getCrewJoinRequests } from '@/entities/crew/api/getCrewJoinRequests';
import { getCrewMembers } from '@/entities/crew/api/getCrewMembers';
import { getMyAttendance } from '@/entities/user/api/getMyAttendance';
import { getMyAttendanceCalendar } from '@/entities/user/api/getMyAttendanceCalendar';
import { getMyInfo } from '@/entities/user/api/getMyInfo';
import type {
  MyAttendanceCalendarRequest,
  MyAttendanceRequest,
} from '@/entities/user/model';

export const memberQueries = {
  all: ['member'] as const,
  attendanceKey: (request?: MyAttendanceRequest) =>
    [...memberQueries.all, 'attendance', request] as const,
  listKey: () => [...memberQueries.all] as const,
  myInfoKey: () => [...memberQueries.all, 'my'] as const,
  crewMembersKey: (crewId: number) =>
    [...memberQueries.listKey(), 'crew-members', crewId] as const,
  joinRequestsKey: (crewId: number) =>
    [...memberQueries.listKey(), 'join-requests', crewId] as const,
  myInfoQuery: () =>
    queryOptions({
      queryKey: memberQueries.myInfoKey(),
      queryFn: () => getMyInfo(),
      staleTime: 1000 * 60 * 60 * 3,
    }),
  calendarKey: (request?: MyAttendanceCalendarRequest) =>
    [...memberQueries.all, 'getMyAttendanceCalendar', request] as const,
  getMyAttendanceCalendarQuery: (request?: MyAttendanceCalendarRequest) =>
    queryOptions({
      queryKey: memberQueries.calendarKey(request),
      queryFn: () => getMyAttendanceCalendar(request),
      staleTime: 1000 * 60 * 60 * 3,
      select: (data) => (data.ok ? data.data.result : []),
    }),
  getMyAttendanceQuery: (request?: MyAttendanceRequest) =>
    queryOptions({
      queryKey: memberQueries.attendanceKey(request),
      queryFn: () => getMyAttendance(request),
      staleTime: 1000 * 60 * 60 * 3,
      select: (data) => (data.ok ? data.data.result : undefined),
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
      queryFn: () => getCrewJoinRequests(crewId),
      staleTime: 1000 * 60 * 5,
      refetchInterval: 1000 * 10,
      refetchIntervalInBackground: false, // 탭 포커스일 때만 refetch
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
};
