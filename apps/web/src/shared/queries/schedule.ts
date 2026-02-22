import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { deleteSchedule } from '@/features/schedule-manage/api';
import {
  deleteCancelParticipation,
  postParticipateSchedule,
} from '@/features/schedule-participate/api';

import {
  getScheduleDetail,
  getScheduleCalendar,
  getScheduleList,
} from '@/entities/schedule/api';
import type { CrewScheduleListRequest } from '@/entities/schedule/model/schedule.model';

export const scheduleQueries = {
  all: ['schedule'] as const,
  detail: (scheduleId: number) => ['detail', scheduleId] as const,
  getScheduleListQuery: (crewId: number, request?: CrewScheduleListRequest) =>
    queryOptions({
      queryKey: [...scheduleQueries.all, 'getScheduleList', crewId, request],
      queryFn: async () => {
        const res = await getScheduleList(crewId, request);
        if (!res.ok) return [];
        return res.data.result ?? [];
      },
    }),
  getScheduleCalendarQuery: (crewId: number) =>
    queryOptions({
      queryKey: [...scheduleQueries.all, 'getScheduleCalendar', crewId],
      queryFn: () => getScheduleCalendar(crewId),
    }),
  scheduleDetailQuery: (crewId: number, scheduleId: number) =>
    queryOptions({
      queryKey: [...scheduleQueries.all, ...scheduleQueries.detail(scheduleId)],
      queryFn: async () => getScheduleDetail(crewId, scheduleId),
      enabled: crewId > 0 && scheduleId > 0,
      staleTime: 1000 * 60 * 60 * 3,
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
