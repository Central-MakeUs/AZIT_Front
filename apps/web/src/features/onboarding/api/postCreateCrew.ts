import { onboardingApi } from './client';
import { post } from '@/shared/api/httpMethods';
import { END_POINT } from '@/shared/constants/endpoint';
import type { CreateCrewResponseType } from './types';
import type { CreateCrewRequest } from '@/shared/api/models';

export const postCreateCrew = (request: CreateCrewRequest) => {
  return post<CreateCrewResponseType, CreateCrewRequest>(
    onboardingApi,
    END_POINT.ONBOARDING.CREATE_CREW,
    request
  );
};
