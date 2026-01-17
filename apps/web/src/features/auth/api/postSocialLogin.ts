import { api } from '@/shared/api/apiClient';

import type {
  AuthProviderType,
  SocialLoginRequestType,
  SocialLoginResponseType,
} from './authTypes';
import { END_POINT } from '@/shared/config/endpoint';

export const postSocialLogin = async (
  provider: AuthProviderType,
  request: SocialLoginRequestType
): Promise<SocialLoginResponseType> => {
  const response = await api
    .post(`${END_POINT.AUTH.SOCIAL_LOGIN(provider)}`, { json: request })
    .json<SocialLoginResponseType>();

  return response;
};
