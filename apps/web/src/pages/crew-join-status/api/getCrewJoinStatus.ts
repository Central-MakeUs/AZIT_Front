import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';
import type { CrewJoinStatusResponse } from './types';

export const getCrewJoinStatus = (crewId: number) => {
  return auth.get<CrewJoinStatusResponse>(
    END_POINT.ONBOARDING.JOIN_STATUS(crewId)
  );
};
