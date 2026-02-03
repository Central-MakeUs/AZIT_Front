import type { JoinCrewRequest } from '@/shared/api/models';
import { END_POINT } from '@/shared/constants/endpoint';
import { onboardingApi } from './client';
import type { JoinCrewResponseType } from './types';

export const postJoinCrew = async (request: JoinCrewRequest) => {
  const response = await onboardingApi
    .post(END_POINT.ONBOARDING.JOIN_CREW, {
      json: request,
    })
    .json<JoinCrewResponseType>();

  return response;
};
