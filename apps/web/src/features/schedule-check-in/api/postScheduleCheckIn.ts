import { auth } from '@/shared/api/apiClient';
import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type { ScheduleCheckInRequest } from '@/entities/schedule/model/schedule.model';

export const postScheduleCheckIn = (
  scheduleId: number,
  payload: ScheduleCheckInRequest
) => {
  return auth.post<ApiResponseWithoutResult, ScheduleCheckInRequest>(
    END_POINT.SCHEDULE.CHECK_IN(scheduleId),
    payload
  );
};
