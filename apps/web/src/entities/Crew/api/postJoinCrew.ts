import type { ApiResponse } from '@/shared/api/baseTypes';
import type { JoinCrewRequest } from '@/shared/api/models/crew';
import { onboarding } from '@/shared/api/onboardingClient';
import { END_POINT } from '@/shared/constants/endpoint';

export const postJoinCrew = (request: JoinCrewRequest) => {
  return onboarding.post<ApiResponse<Record<string, never>>, JoinCrewRequest>(
    END_POINT.ONBOARDING.JOIN_CREW,
    request
  );
};
