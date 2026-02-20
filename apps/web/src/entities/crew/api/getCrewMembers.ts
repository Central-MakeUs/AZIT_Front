import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type { CrewMemberListResult } from '@/entities/user/model';

export const getCrewMembers = (
  crewId: number,
  params: { cursorId?: number; size?: number }
) => {
  const searchParams = { ...params, size: params.size ?? 10 };
  return auth.get<ApiResponse<CrewMemberListResult>>(
    END_POINT.CREW.MEMBERS(crewId),
    { searchParams }
  );
};
