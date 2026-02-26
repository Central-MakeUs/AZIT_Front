import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type { ScheduleCheckInStatusResponse } from '@/entities/schedule/model/schedule.model';

export const getScheduleCheckInStatus = () => {
  return auth.get<ApiResponse<ScheduleCheckInStatusResponse>>(
    END_POINT.SCHEDULE.CHECK_IN_STATUS
  );
};
