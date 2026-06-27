import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type { CrewScheduleDetailResponse } from '../model/schedule.model';

export const getScheduleDetail = (crewId: number, scheduleId: number) => {
  return auth.get<ApiResponse<CrewScheduleDetailResponse>>(
    END_POINT.SCHEDULE.DETAIL(crewId, scheduleId)
  );
};
