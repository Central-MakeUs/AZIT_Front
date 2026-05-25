import { auth } from '@/shared/api/apiClient';
import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

export const deleteJoinRequest = (crewId: number) => {
  return auth.delete<ApiResponseWithoutResult>(
    END_POINT.CREW.CANCEL_JOIN_REQUEST(crewId),
    undefined
  );
};
