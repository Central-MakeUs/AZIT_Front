import type { ApiResponse } from '@/shared/api/baseTypes';
import type { CreateCrewResult } from '@/shared/api/models/crew';
import type { CreateCrewRequest } from '@/shared/api/models/crew';
import { onboarding } from '@/shared/api/onboardingClient';
import { END_POINT } from '@/shared/constants/endpoint';

export const postCreateCrew = (request: CreateCrewRequest) => {
  return onboarding.post<ApiResponse<CreateCrewResult>, CreateCrewRequest>(
    END_POINT.ONBOARDING.CREATE_CREW,
    request
  );
};
