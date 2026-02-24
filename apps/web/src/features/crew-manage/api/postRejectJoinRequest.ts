import { auth } from '@/shared/api/apiClient';
import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

export const postRejectJoinRequest = (
  crewId: number,
  targetMemberId: number
) => {
  return auth.post<ApiResponseWithoutResult>(
    END_POINT.CREW.REJECT_JOIN_REQUEST(crewId, targetMemberId),
    undefined
  );
};
