import { auth } from '@/shared/api/apiClient';
import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

export const postApproveJoinRequest = (
  crewId: number,
  targetMemberId: number
) => {
  return auth.post<ApiResponseWithoutResult>(
    END_POINT.CREW.APPROVE_JOIN_REQUEST(crewId, targetMemberId),
    undefined
  );
};
