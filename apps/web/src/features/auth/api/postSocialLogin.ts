import { base } from '@/shared/api/apiClient';
import type { SocialLoginRequest } from '@/shared/api/models';
import { END_POINT } from '@/shared/constants/endpoint';

import type { AuthProviderType, SocialLoginResponseType } from './types';

export const postSocialLogin = (
  provider: AuthProviderType,
  request: SocialLoginRequest
) => {
  return base.post<SocialLoginResponseType, SocialLoginRequest>(
    `${END_POINT.AUTH.SOCIAL_LOGIN(provider)}`,
    request
  );
};
