import { baseApi } from '@/shared/api/apiClient';

import type { AuthProviderType, SocialLoginResponseType } from './types';
import type { SocialLoginRequest } from '@/shared/api/models';
import { END_POINT } from '@/shared/constants/endpoint';

export const postSocialLogin = async (
  provider: AuthProviderType,
  request: SocialLoginRequest
) => {
  const response = await baseApi
    .post(`${END_POINT.AUTH.SOCIAL_LOGIN(provider)}`, { json: request })
    .json<SocialLoginResponseType>();

  return response;
};
