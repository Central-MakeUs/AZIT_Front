import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type {
  CrewScheduleCalendarRequest,
  CrewScheduleCalendarResponse,
} from '../model/schedule.model';

export const getScheduleCalendar = (
  crewId: number,
  request?: CrewScheduleCalendarRequest
) => {
  return auth.get<ApiResponse<CrewScheduleCalendarResponse>>(
    END_POINT.SCHEDULE.CALENDAR(crewId),
    request ? { searchParams: request } : undefined
  );
};
