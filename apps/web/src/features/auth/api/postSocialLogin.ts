import { baseApi } from '@/shared/api/apiClient';

import type {
  AuthProviderType,
  SocialLoginRequestType,
  SocialLoginResponseType,
} from './types';
import { END_POINT } from '@/shared/constants/endpoint';

export const postSocialLogin = async (
  provider: AuthProviderType,
  request: SocialLoginRequestType
): Promise<SocialLoginResponseType> => {
  const response = await baseApi
    .post(`${END_POINT.AUTH.SOCIAL_LOGIN(provider)}`, { json: request })
    .json<SocialLoginResponseType>();

  return response;
};
