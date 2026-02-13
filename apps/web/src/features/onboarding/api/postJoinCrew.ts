import { onboarding } from '@/features/onboarding/api/client';
import type { JoinCrewResponseType } from '@/features/onboarding/api/types';

import type { JoinCrewRequest } from '@/shared/api/models/crew';
import { END_POINT } from '@/shared/constants/endpoint';

export const postJoinCrew = (request: JoinCrewRequest) => {
  return onboarding.post<JoinCrewResponseType, JoinCrewRequest>(
    END_POINT.ONBOARDING.JOIN_CREW,
    request
  );
};
