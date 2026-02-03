import type { components, operations } from './apiTypes';

export type AuthProvider =
  operations['socialLogin']['parameters']['path']['provider'];
export type SocialLoginRequest = components['schemas']['SocialLoginRequest'];
export type SocialLoginResult = components['schemas']['SocialLoginResponse'];
export type ReissueTokenResult = components['schemas']['SocialLoginResponse'];
export type TermAgreeRequest = components['schemas']['AgreeToTermsRequest'];
export type CreateCrewRequest = components['schemas']['CreateCrewRequest'];
export type CreateCrewResult = components['schemas']['CreateCrewResponse'];
export type JoinCrewRequest = components['schemas']['JoinCrewRequest'];
export type CrewInfoResult = components['schemas']['CrewInvitationResponse'];
