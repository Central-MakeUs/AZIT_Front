import { auth } from '@/shared/api/apiClient';
import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

export const deleteCrew = (crewId: number) => {
  return auth.delete<ApiResponseWithoutResult>(
    END_POINT.CREW.DISSOLVE(crewId),
    undefined
  );
};
