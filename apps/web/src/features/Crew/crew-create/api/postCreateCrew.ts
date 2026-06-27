import type { CreateCrewRequest } from '@/shared/api/models/crew';
import { onboarding } from '@/shared/api/onboardingClient';
import { END_POINT } from '@/shared/constants/endpoint';

import type { CreateCrewResponseType } from './types';

export const postCreateCrew = (request: CreateCrewRequest) => {
  return onboarding.post<CreateCrewResponseType, CreateCrewRequest>(
    END_POINT.ONBOARDING.CREATE_CREW,
    request
  );
};
