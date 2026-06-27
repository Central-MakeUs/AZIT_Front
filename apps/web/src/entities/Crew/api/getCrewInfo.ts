import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

import type { CrewInfoResponse } from '@/entities/Crew/model';

export const getCrewInfo = (invitationCode: string) => {
  return auth.get<CrewInfoResponse>(
    END_POINT.ONBOARDING.CREW_INFO(invitationCode)
  );
};
