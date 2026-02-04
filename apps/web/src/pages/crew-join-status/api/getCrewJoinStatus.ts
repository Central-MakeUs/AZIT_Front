import { authApi } from '@/shared/api/apiClient';
import { get } from '@/shared/api/httpMethods';
import { END_POINT } from '@/shared/constants/endpoint';
import type { CrewJoinStatusResponse } from './types';

export const getCrewJoinStatus = (crewId: number) => {
  return get<CrewJoinStatusResponse>(
    authApi,
    END_POINT.ONBOARDING.JOIN_STATUS(crewId)
  );
};
