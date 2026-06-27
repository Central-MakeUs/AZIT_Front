import { mutationOptions, queryOptions } from '@tanstack/react-query';


import { getJoinedCrews } from './getJoinedCrews';
import { getMyAttendance } from './getMyAttendance';
import { getMyAttendanceCalendar } from './getMyAttendanceCalendar';
import { getMyCrews } from './getMyCrews';
import { getMyInfo } from './getMyInfo';
import { getMyProviders } from './getMyProviders';
import { updateMyProfile } from './updateMyProfile';

import type {
  MyAttendanceCalendarRequest,
  MyAttendanceRequest,
} from '@/entities/User/model';

export const userQueries = {
  all: ['member'] as const,
  myInfoKey: () => [...userQueries.all, 'my'] as const,
  myCrewsKey: () => [...userQueries.all, 'my-crews'] as const,
  myProvidersKey: () => [...userQueries.all, 'providers'] as const,
  attendanceKey: (request?: MyAttendanceRequest) =>
    [...userQueries.all, 'attendance', request] as const,
  calendarKey: (request?: MyAttendanceCalendarRequest) =>
    [...userQueries.all, 'getMyAttendanceCalendar', request] as const,
  joinedCrewsKey: () => [...userQueries.all, 'joined-crews'] as const,
  myInfoQuery: () =>
    queryOptions({
      queryKey: userQueries.myInfoKey(),
      queryFn: () => getMyInfo(),
      staleTime: 1000 * 60 * 60 * 3,
    }),
  myCrewsQuery: () =>
    queryOptions({
      queryKey: userQueries.myCrewsKey(),
      queryFn: () => getMyCrews(),
      staleTime: 1000 * 60 * 60 * 3,
      select: (data) => data.result ?? [],
    }),
  joinedCrewsQuery: () =>
    queryOptions({
      queryKey: userQueries.joinedCrewsKey(),
      queryFn: () => getJoinedCrews(),
      select: (data) => data.result ?? [],
    }),
  myProvidersQuery: () =>
    queryOptions({
      queryKey: userQueries.myProvidersKey(),
      queryFn: () => getMyProviders(),
      staleTime: Infinity,
      select: (data) => data.result?.providers ?? [],
    }),
  getMyAttendanceCalendarQuery: (request?: MyAttendanceCalendarRequest) =>
    queryOptions({
      queryKey: userQueries.calendarKey(request),
      queryFn: () => getMyAttendanceCalendar(request),
      staleTime: 1000 * 60 * 60 * 3,
      select: (data) => data.result ?? [],
    }),
  getMyAttendanceQuery: (request?: MyAttendanceRequest) =>
    queryOptions({
      queryKey: userQueries.attendanceKey(request),
      queryFn: () => getMyAttendance(request),
      staleTime: 1000 * 60 * 60 * 3,
      select: (data) => data.result,
    }),
  updateMyProfile: mutationOptions({
    mutationFn: updateMyProfile,
  }),
};
