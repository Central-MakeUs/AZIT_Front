import type { JoinCrewRequest } from '@/shared/api/models/crew';
import { onboarding } from '@/shared/api/onboardingClient';
import { END_POINT } from '@/shared/constants/endpoint';

import type { JoinCrewResponseType } from './types';

export const postJoinCrew = (request: JoinCrewRequest) => {
  return onboarding.post<JoinCrewResponseType, JoinCrewRequest>(
    END_POINT.ONBOARDING.JOIN_CREW,
    request
  );
};
