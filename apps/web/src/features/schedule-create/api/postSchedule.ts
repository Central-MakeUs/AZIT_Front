import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type { CreateScheduleRequest } from '@/entities/schedule/model/schedule.model';

export const postSchedule = (crewId: number, payload: CreateScheduleRequest) =>
  auth.post<ApiResponse<void>, CreateScheduleRequest>(
    END_POINT.SCHEDULE.LIST(crewId),
    payload
  );
