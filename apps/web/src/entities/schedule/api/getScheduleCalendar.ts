import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import type { CrewScheduleCalendarResponse } from '@/shared/api/models';
import { END_POINT } from '@/shared/constants/endpoint';

export const getScheduleCalendar = (crewId: number) => {
  return auth.get<ApiResponse<CrewScheduleCalendarResponse>>(
    END_POINT.SCHEDULE.CALENDAR(crewId)
  );
};
