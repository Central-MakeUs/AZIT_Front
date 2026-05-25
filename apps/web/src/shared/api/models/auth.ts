import type { components, operations } from '@/shared/api/apiTypes';

export type AuthProvider =
  operations['socialLogin']['parameters']['path']['provider'];
export type SocialLoginRequest = components['schemas']['SocialLoginRequest'];
type SocialLoginStatusExtended =
  | NonNullable<components['schemas']['SocialLoginResponse']['status']>
  | 'PENDING_ONBOARDING'
  | 'WAITING_FOR_APPROVE'
  | 'APPROVED_PENDING_CONFIRM'
  | 'REJECTED_PENDING_CONFIRM'
  | 'KICKED_PENDING_CONFIRM';

export type SocialLoginResult = Omit<
  Required<components['schemas']['SocialLoginResponse']>,
  'status'
> & { status: SocialLoginStatusExtended };
export type ReissueTokenResult = Required<
  components['schemas']['SocialLoginResponse']
>;
export type TermAgreeRequest = Required<
  components['schemas']['AgreeToTermsRequest']
>;
