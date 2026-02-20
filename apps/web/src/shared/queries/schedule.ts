import { queryOptions } from '@tanstack/react-query';

import type { CrewScheduleListRequest } from '@/shared/api/models/schedule';

import { getScheduleCalendar } from '@/entities/schedule/api/getScheduleCalendar';
import { getScheduleList } from '@/entities/schedule/api/getScheduleList';

export const scheduleQueries = {
  all: ['schedule'] as const,
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
};
