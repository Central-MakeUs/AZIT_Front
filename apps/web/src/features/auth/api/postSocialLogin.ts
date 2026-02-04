import { baseApi } from '@/shared/api/apiClient';
import { post } from '@/shared/api/httpMethods';

import type { AuthProviderType, SocialLoginResponseType } from './types';
import type { SocialLoginRequest } from '@/shared/api/models';
import { END_POINT } from '@/shared/constants/endpoint';

export const postSocialLogin = (
  provider: AuthProviderType,
  request: SocialLoginRequest
) => {
  return post<SocialLoginResponseType, SocialLoginRequest>(
    baseApi,
    `${END_POINT.AUTH.SOCIAL_LOGIN(provider)}`,
    request
  );
};
