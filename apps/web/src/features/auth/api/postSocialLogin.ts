import type { components, operations } from '@/shared/api/api-types';
import type { ApiResponse } from '@/shared/api/base';
import { api } from '@/shared/lib/ky';

type Provider = operations['socialLogin']['parameters']['path']['provider'];
type SocialLoginRequest = components['schemas']['SocialLoginRequest'];
type SocialLoginResult = components['schemas']['SocialLoginResponse'];

type SocialLoginApiResponse = ApiResponse<SocialLoginResult>;

export const postSocialLogin = async (
  provider: Provider,
  request: SocialLoginRequest
): Promise<SocialLoginApiResponse> => {
  const response = await api
    .post(`/api/v1/auth/social-login/${provider}`, { json: request })
    .json<SocialLoginApiResponse>();

  return response;
};
