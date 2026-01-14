import type { components, operations } from '@/shared/api/apiTypes';
import type { ApiResponse } from '@/shared/api/baseTypes';

export type AuthProvider =
  operations['socialLogin']['parameters']['path']['provider'];
export type SocialLoginRequest = components['schemas']['SocialLoginRequest'];
export type SocialLoginResult = components['schemas']['SocialLoginResponse'];

export type SocialLoginApiResponse = ApiResponse<SocialLoginResult>;
