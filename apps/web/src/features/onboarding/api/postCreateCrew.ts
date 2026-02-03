import { onboardingApi } from './client';
import { END_POINT } from '@/shared/constants/endpoint';
import type { CreateCrewResponseType } from './types';
import type { CreateCrewRequest } from '@/shared/api/models';

export const postCreateCrew = async (request: CreateCrewRequest) => {
  const response = await onboardingApi
    .post(END_POINT.ONBOARDING.CREATE_CREW, {
      json: request,
    })
    .json<CreateCrewResponseType>();

  return response;
};
