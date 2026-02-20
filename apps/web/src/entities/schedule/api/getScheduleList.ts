import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import type {
  CrewScheduleListRequest,
  CrewScheduleListResponse,
} from '@/shared/api/models/schedule';
import { END_POINT } from '@/shared/constants/endpoint';

export const getScheduleList = (
  crewId: number,
  request?: CrewScheduleListRequest
) => {
  return auth.get<ApiResponse<CrewScheduleListResponse[]>>(
    END_POINT.SCHEDULE.LIST(crewId),
    request ? { searchParams: request } : undefined
  );
};
