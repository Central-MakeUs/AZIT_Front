import type { TermAgreeRequest } from '@/shared/api/models/auth';
import { onboarding } from '@/shared/api/onboardingClient';
import { END_POINT } from '@/shared/constants/endpoint';

import type { TermAgreeResponseType } from './types';

export const postTermAgree = (request: TermAgreeRequest) => {
  return onboarding.post<TermAgreeResponseType, TermAgreeRequest>(
    END_POINT.ONBOARDING.TERM_AGREE,
    request
  );
};
