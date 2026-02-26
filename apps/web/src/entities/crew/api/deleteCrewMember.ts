import { auth } from '@/shared/api/apiClient';
import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

export const deleteCrewMember = (crewId: number, targetMemberId: number) => {
  return auth.delete<ApiResponseWithoutResult>(
    END_POINT.CREW.MEMBER(crewId, targetMemberId),
    undefined
  );
};
