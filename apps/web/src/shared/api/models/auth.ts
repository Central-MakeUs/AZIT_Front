import type { components, operations } from '@/shared/api/apiTypes';

export type AuthProvider =
  operations['socialLogin']['parameters']['path']['provider'];
export type SocialLoginRequest = components['schemas']['SocialLoginRequest'];
export type SocialLoginResult = Required<
  components['schemas']['SocialLoginResponse']
>;
export type ReissueTokenResult = Required<
  components['schemas']['SocialLoginResponse']
>;
export type TermAgreeRequest = components['schemas']['AgreeToTermsRequest'];
