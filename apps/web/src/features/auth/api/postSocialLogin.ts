import { api } from '@/shared/lib/ky';

import type {
  Provider,
  SocialLoginRequest,
  SocialLoginApiResponse,
} from './authTypes';

export const postSocialLogin = async (
  provider: Provider,
  request: SocialLoginRequest
): Promise<SocialLoginApiResponse> => {
  const response = await api
    .post(`/api/v1/auth/social-login/${provider}`, { json: request })
    .json<SocialLoginApiResponse>();

  return response;
};
