import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import type { CrewMemberListResult } from '@/shared/api/models';
import { END_POINT } from '@/shared/constants/endpoint';

export const getCrewMembers = (
  crewId: number,
  params: { cursorId?: number; size?: number } = { size: 10 }
) => {
  return auth.get<ApiResponse<CrewMemberListResult>>(
    END_POINT.CREW.MEMBERS(crewId),
    { searchParams: params }
  );
};
