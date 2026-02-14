import { onboarding } from '@/features/onboarding/api/client';
import type { CreateCrewResponseType } from '@/features/onboarding/api/types';

import type { CreateCrewRequest } from '@/shared/api/models/crew';
import { END_POINT } from '@/shared/constants/endpoint';

export const postCreateCrew = (request: CreateCrewRequest) => {
  return onboarding.post<CreateCrewResponseType, CreateCrewRequest>(
    END_POINT.ONBOARDING.CREATE_CREW,
    request
  );
};
