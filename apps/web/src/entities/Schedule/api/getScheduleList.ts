import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type {
  CrewScheduleListRequest,
  CrewScheduleListResponse,
} from '../model/schedule.model';

export const getScheduleList = (
  crewId: number,
  request?: CrewScheduleListRequest
) => {
  return auth.get<ApiResponse<CrewScheduleListResponse[]>>(
    END_POINT.SCHEDULE.LIST(crewId),
    request ? { searchParams: request } : undefined
  );
};
