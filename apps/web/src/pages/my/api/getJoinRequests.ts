import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import type { JoinRequestMemberResult } from '@/shared/api/models';
import { END_POINT } from '@/shared/constants/endpoint';

export const getJoinRequests = (crewId: number) => {
  return auth.get<ApiResponse<JoinRequestMemberResult[]>>(
    END_POINT.CREW.JOIN_REQUESTS(crewId)
  );
};
