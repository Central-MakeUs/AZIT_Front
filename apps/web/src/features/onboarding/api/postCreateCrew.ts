import { onboarding } from './client';
import { END_POINT } from '@/shared/constants/endpoint';
import type { CreateCrewResponseType } from './types';
import type { CreateCrewRequest } from '@/shared/api/models';

export const postCreateCrew = (request: CreateCrewRequest) => {
  return onboarding.post<CreateCrewResponseType, CreateCrewRequest>(
    END_POINT.ONBOARDING.CREATE_CREW,
    request
  );
};
