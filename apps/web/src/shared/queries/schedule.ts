import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query';

import { getScheduleCheckInStatus } from '@/features/schedule-check-in/api/getScheduleCheckInStatus';
import { postScheduleCheckIn } from '@/features/schedule-check-in/api/postScheduleCheckIn';
import { postSchedule } from '@/features/schedule-create/api/postSchedule';
import { updateSchedule } from '@/features/schedule-edit/api/updateSchedule';
import { deleteSchedule } from '@/features/schedule-manage/api';
import {
  deleteCancelParticipation,
  postParticipateSchedule,
} from '@/features/schedule-participate/api';

import {
  getScheduleDetail,
  getScheduleParticipants,
} from '@/entities/schedule/api';
import { getMemberScheduleList } from '@/entities/schedule/api/getMemberScheduleList';
import { getScheduleCalendar } from '@/entities/schedule/api/getScheduleCalendar';
import { getScheduleList } from '@/entities/schedule/api/getScheduleList';
import type {
  CreateScheduleRequest,
  CrewScheduleCalendarRequest,
  CrewScheduleListRequest,
  ScheduleCheckInRequest,
  UpdateScheduleRequest,
} from '@/entities/schedule/model/schedule.model';

export const scheduleQueries = {
  all: ['schedule'] as const,
  detail: (scheduleId: number) =>
    [...scheduleQueries.all, 'detail', scheduleId] as const,
  participants: (scheduleId: number) =>
    [...scheduleQueries.all, 'participants', scheduleId] as const,
  listKey: (crewId: number, request?: CrewScheduleListRequest) =>
    [...scheduleQueries.all, 'getScheduleList', crewId, request] as const,
  memberListKey: () =>
    [...scheduleQueries.all, 'getMemberScheduleList'] as const,
  checkInStatusKey: () =>
    [...scheduleQueries.all, 'getScheduleCheckInStatus'] as const,
  getScheduleListQuery: (crewId: number, request?: CrewScheduleListRequest) =>
    queryOptions({
      queryKey: scheduleQueries.listKey(crewId, request),
      queryFn: async () => {
        const res = await getScheduleList(crewId, request);
        if (!res.ok) return [];
        return res.data.result ?? [];
      },
    }),
  getMemberScheduleListQuery: () =>
    queryOptions({
      queryKey: scheduleQueries.memberListKey(),
      queryFn: async () => {
        const res = await getMemberScheduleList();
        if (!res.ok) return [];
        return res.data.result ?? [];
      },
    }),
  getScheduleCheckInStatusQuery: () =>
    queryOptions({
      queryKey: scheduleQueries.checkInStatusKey(),
      queryFn: async () => {
        const res = await getScheduleCheckInStatus();
        if (!res.ok) return null;
        return res.data.result ?? null;
      },
    }),
  getScheduleCalendarQuery: (
    crewId: number,
    request?: CrewScheduleCalendarRequest
  ) =>
    queryOptions({
      queryKey: [...scheduleQueries.all, 'getScheduleCalendar', crewId],
      queryFn: async () => {
        const res = await getScheduleCalendar(crewId, request);
        if (!res.ok) return [];
        return res.data.result ?? [];
      },
    }),
  createScheduleMutation: mutationOptions({
    mutationFn: ({
      crewId,
      payload,
    }: {
      crewId: number;
      payload: CreateScheduleRequest;
    }) => postSchedule(crewId, payload),
  }),
  updateScheduleMutation: mutationOptions({
    mutationFn: ({
      crewId,
      scheduleId,
      payload,
    }: {
      crewId: number;
      scheduleId: number;
      payload: UpdateScheduleRequest;
    }) => updateSchedule(crewId, scheduleId, payload),
  }),
  scheduleCheckInMutation: mutationOptions({
    mutationFn: ({
      scheduleId,
      payload,
    }: {
      scheduleId: number;
      payload: ScheduleCheckInRequest;
    }) => postScheduleCheckIn(scheduleId, payload),
  }),
  scheduleDetailQuery: (crewId: number, scheduleId: number) =>
    queryOptions({
      queryKey: scheduleQueries.detail(scheduleId),
      queryFn: async () => getScheduleDetail(crewId, scheduleId),
      enabled: crewId > 0 && scheduleId > 0,
      staleTime: 1000 * 60 * 5,
      retry: 0,
    }),
  scheduleParticipantsQuery: (crewId: number, scheduleId: number) =>
    infiniteQueryOptions({
      queryKey: scheduleQueries.participants(scheduleId),
      queryFn: ({ pageParam }) =>
        getScheduleParticipants(crewId, scheduleId, { cursorId: pageParam }),
      getNextPageParam: (lastPage) => {
        if (!lastPage.ok) return undefined;
        const { hasNext, lastId } = lastPage.data.result || {};
        return hasNext && lastId ? lastId : undefined;
      },
      initialPageParam: undefined as number | undefined,
      staleTime: 1000 * 60 * 5,
    }),
  participateSchedule: mutationOptions({
    mutationFn: ({
      crewId,
      scheduleId,
    }: {
      crewId: number;
      scheduleId: number;
    }) => postParticipateSchedule(crewId, scheduleId),
  }),
  cancelParticipation: mutationOptions({
    mutationFn: ({
      crewId,
      scheduleId,
    }: {
      crewId: number;
      scheduleId: number;
    }) => deleteCancelParticipation(crewId, scheduleId),
  }),
  deleteSchedule: mutationOptions({
    mutationFn: ({
      crewId,
      scheduleId,
    }: {
      crewId: number;
      scheduleId: number;
    }) => deleteSchedule(crewId, scheduleId),
  }),
};
