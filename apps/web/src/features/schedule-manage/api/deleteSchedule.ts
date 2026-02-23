import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

export const deleteSchedule = (crewId: number, scheduleId: number) => {
  return auth.delete<ApiResponse<undefined>>(
    END_POINT.SCHEDULE.DETAIL(crewId, scheduleId),
    undefined
  );
};
