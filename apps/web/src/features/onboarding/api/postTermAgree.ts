import { onboarding } from '@/features/onboarding/api/client';
import type { TermAgreeResponseType } from '@/features/onboarding/api/types';

import type { TermAgreeRequest } from '@/shared/api/models/auth';
import { END_POINT } from '@/shared/constants/endpoint';

export const postTermAgree = (request: TermAgreeRequest) => {
  return onboarding.post<TermAgreeResponseType, TermAgreeRequest>(
    END_POINT.ONBOARDING.TERM_AGREE,
    request
  );
};
