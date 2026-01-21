import { onboardingApi } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';
import type { TermAgreeResponseType } from './types';
import type { TermAgreeRequest } from '@/shared/api/models';

export const postTermAgree = async (request: TermAgreeRequest) => {
  const response = await onboardingApi
    .post(END_POINT.AUTH.TERM_AGREE, {
      json: request,
    })
    .json<TermAgreeResponseType>();

  return response;
};
