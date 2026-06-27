import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type {
  MyAttendanceCalendarRequest,
  MyAttendanceCalendarResponse,
} from '@/entities/User/model';

export const getMyAttendanceCalendar = (
  request?: MyAttendanceCalendarRequest
) => {
  return auth.get<ApiResponse<MyAttendanceCalendarResponse>>(
    END_POINT.MEMBER.MY_ATTENDANCE_CALENDAR,
    request ? { searchParams: request } : undefined
  );
};
