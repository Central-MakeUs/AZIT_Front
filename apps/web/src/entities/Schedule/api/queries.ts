import { mutationOptions, queryOptions } from '@tanstack/react-query';


import { getMemberScheduleList } from './getMemberScheduleList';
import { getScheduleCheckInStatus } from './getScheduleCheckInStatus';
import { postScheduleCheckIn } from './postScheduleCheckIn';

import type { ScheduleCheckInRequest } from '@/entities/Schedule/model/schedule.model';

export const scheduleEntityQueries = {
  all: ['schedule'] as const,
  memberListKey: () =>
    [...scheduleEntityQueries.all, 'getMemberScheduleList'] as const,
  checkInStatusKey: () =>
    [...scheduleEntityQueries.all, 'getScheduleCheckInStatus'] as const,
  getMemberScheduleListQuery: () =>
    queryOptions({
      queryKey: scheduleEntityQueries.memberListKey(),
      queryFn: async () => {
        const res = await getMemberScheduleList();
        return res.result ?? [];
      },
    }),
  getScheduleCheckInStatusQuery: () =>
    queryOptions({
      queryKey: scheduleEntityQueries.checkInStatusKey(),
      queryFn: async () => {
        const res = await getScheduleCheckInStatus();
        return res.result ?? null;
      },
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
};
