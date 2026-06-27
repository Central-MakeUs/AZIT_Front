
import { base } from '@/shared/api/apiClient';
import type { SocialLoginRequest } from '@/shared/api/models/auth';
import type {
  AuthProviderType,
  SocialLoginResponseType,
} from '@/shared/auth/api/types';
import { END_POINT } from '@/shared/constants/endpoint';

export const postSocialLogin = (
  provider: AuthProviderType,
  request: SocialLoginRequest
) => {
  return base.post<SocialLoginResponseType, SocialLoginRequest>(
    `${END_POINT.AUTH.SOCIAL_LOGIN(provider)}`,
    request
  );
};
