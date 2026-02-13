import type { JoinCrewRequest } from '@/shared/api/models';
import { END_POINT } from '@/shared/constants/endpoint';

import { onboarding } from './client';
import type { JoinCrewResponseType } from './types';

export const postJoinCrew = (request: JoinCrewRequest) => {
  return onboarding.post<JoinCrewResponseType, JoinCrewRequest>(
    END_POINT.ONBOARDING.JOIN_CREW,
    request
  );
};
