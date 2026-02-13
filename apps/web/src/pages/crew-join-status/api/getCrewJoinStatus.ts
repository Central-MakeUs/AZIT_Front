import type { CrewJoinStatusResponse } from '@/pages/crew-join-status/api/types';

import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

export const getCrewJoinStatus = (crewId: number) => {
  return auth.get<CrewJoinStatusResponse>(
    END_POINT.ONBOARDING.JOIN_STATUS(crewId)
  );
};
