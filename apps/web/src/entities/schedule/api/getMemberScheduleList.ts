import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type { CrewScheduleListResponse } from '../model/schedule.model';

export const getMemberScheduleList = () => {
  return auth.get<ApiResponse<CrewScheduleListResponse[]>>(
    END_POINT.SCHEDULE.MEMBER_LIST
  );
};
