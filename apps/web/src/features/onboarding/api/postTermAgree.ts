import { onboarding } from './client';
import { END_POINT } from '@/shared/constants/endpoint';
import type { TermAgreeResponseType } from '../api/types';
import type { TermAgreeRequest } from '@/shared/api/models';

export const postTermAgree = (request: TermAgreeRequest) => {
  return onboarding.post<TermAgreeResponseType, TermAgreeRequest>(
    END_POINT.ONBOARDING.TERM_AGREE,
    request
  );
};
