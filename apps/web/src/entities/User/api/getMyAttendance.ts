import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type { MyAttendanceRequest, MyAttendanceResponse } from '../model';

export const getMyAttendance = (request?: MyAttendanceRequest) => {
  return auth.get<ApiResponse<MyAttendanceResponse>>(
    END_POINT.MEMBER.MY_ATTENDANCE,
    request ? { searchParams: request } : undefined
  );
};
