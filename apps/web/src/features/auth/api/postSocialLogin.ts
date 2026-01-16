import { api } from '@/shared/api/apiClient';

import type {
  AuthProvider,
  SocialLoginRequest,
  SocialLoginApiResponse,
} from './authTypes';

export const postSocialLogin = async (
  provider: AuthProvider,
  request: SocialLoginRequest
): Promise<SocialLoginApiResponse> => {
  const response = await api
    .post(`/api/v1/auth/social-login/${provider}`, { json: request })
    .json<SocialLoginApiResponse>();

  return response;
};
