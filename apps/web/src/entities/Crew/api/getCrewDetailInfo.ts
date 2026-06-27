import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import type { CrewDetailInfoResult } from '@/shared/api/models/crew';
import { END_POINT } from '@/shared/constants/endpoint';

export const getCrewDetailInfo = (crewId: number) => {
  return auth.get<ApiResponse<CrewDetailInfoResult>>(
    END_POINT.CREW.UPDATE_INFO(crewId)
  );
};
