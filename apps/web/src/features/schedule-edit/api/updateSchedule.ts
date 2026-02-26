import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type { UpdateScheduleRequest } from '@/entities/schedule/model/schedule.model';

export const updateSchedule = (
  crewId: number,
  scheduleId: number,
  payload: UpdateScheduleRequest
) =>
  auth.put<ApiResponse<void>, UpdateScheduleRequest>(
    END_POINT.SCHEDULE.DETAIL(crewId, scheduleId),
    payload
  );
