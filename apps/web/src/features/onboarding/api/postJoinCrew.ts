import type { JoinCrewRequest } from '@/shared/api/models';
import { END_POINT } from '@/shared/constants/endpoint';
import { onboardingApi } from './client';
import type { JoinCrewResponseType } from './types';
import { post } from '@/shared/api/httpMethods';

export const postJoinCrew = (request: JoinCrewRequest) => {
  return post<JoinCrewResponseType, JoinCrewRequest>(
    onboardingApi,
    END_POINT.ONBOARDING.JOIN_CREW,
    request
  );
};
