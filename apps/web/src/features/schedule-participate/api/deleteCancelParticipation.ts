import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

export const deleteCancelParticipation = (
  crewId: number,
  scheduleId: number
) => {
  return auth.delete<ApiResponse<undefined>>(
    END_POINT.SCHEDULE.PARTICIPATE(crewId, scheduleId),
    undefined
  );
};
