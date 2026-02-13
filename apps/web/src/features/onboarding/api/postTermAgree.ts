import type { TermAgreeRequest } from '@/shared/api/models';
import { END_POINT } from '@/shared/constants/endpoint';

import { onboarding } from './client';
import type { TermAgreeResponseType } from '../api/types';

export const postTermAgree = (request: TermAgreeRequest) => {
  return onboarding.post<TermAgreeResponseType, TermAgreeRequest>(
    END_POINT.ONBOARDING.TERM_AGREE,
    request
  );
};
