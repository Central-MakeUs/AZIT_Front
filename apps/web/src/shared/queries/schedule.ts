import { queryOptions } from '@tanstack/react-query';

import { getMemberScheduleList } from '@/entities/schedule/api/getMemberScheduleList';
import { getScheduleCalendar } from '@/entities/schedule/api/getScheduleCalendar';
import { getScheduleList } from '@/entities/schedule/api/getScheduleList';
import type { CrewScheduleListRequest } from '@/entities/schedule/model/schedule.model';

export const scheduleQueries = {
  all: ['schedule'] as const,
  listKey: (crewId: number, request?: CrewScheduleListRequest) =>
    [...scheduleQueries.all, 'getScheduleList', crewId, request] as const,
  memberListKey: () =>
    [...scheduleQueries.all, 'getMemberScheduleList'] as const,
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
  getScheduleCalendarQuery: (crewId: number) =>
    queryOptions({
      queryKey: [...scheduleQueries.all, 'getScheduleCalendar', crewId],
      queryFn: () => getScheduleCalendar(crewId),
    }),
};
