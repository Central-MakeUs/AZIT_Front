import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type { JoinRequestMemberResult } from '@/entities/crew/model/crew.types';

export const getCrewJoinRequests = (crewId: number) => {
  return auth.get<ApiResponse<JoinRequestMemberResult[]>>(
    END_POINT.CREW.JOIN_REQUESTS(crewId)
  );
};
