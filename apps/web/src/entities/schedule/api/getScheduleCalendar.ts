import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type { CrewScheduleCalendarResponse } from '../model/schedule.model';

export const getScheduleCalendar = (crewId: number) => {
  return auth.get<ApiResponse<CrewScheduleCalendarResponse>>(
    END_POINT.SCHEDULE.CALENDAR(crewId)
  );
};
