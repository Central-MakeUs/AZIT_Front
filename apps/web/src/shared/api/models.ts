import type { components, operations } from './apiTypes';

export type AuthProvider =
  operations['socialLogin']['parameters']['path']['provider'];
export type SocialLoginRequest = components['schemas']['SocialLoginRequest'];
export type SocialLoginResult = components['schemas']['SocialLoginResponse'];
export type ReissueTokenResult = components['schemas']['SocialLoginResponse'];
