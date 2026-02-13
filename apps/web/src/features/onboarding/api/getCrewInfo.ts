import type { CrewInfoResponseType } from '@/features/onboarding/api/types';

import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

export const getCrewInfo = (invitationCode: string) => {
  return auth.get<CrewInfoResponseType>(
    END_POINT.ONBOARDING.CREW_INFO(invitationCode)
  );
};
