import { onboardingApi } from './client';
import { post } from '@/shared/api/httpMethods';
import { END_POINT } from '@/shared/constants/endpoint';
import type { TermAgreeResponseType } from '../api/types';
import type { TermAgreeRequest } from '@/shared/api/models';

export const postTermAgree = (request: TermAgreeRequest) => {
  return post<TermAgreeResponseType, TermAgreeRequest>(
    onboardingApi,
    END_POINT.ONBOARDING.TERM_AGREE,
    request
  );
};
