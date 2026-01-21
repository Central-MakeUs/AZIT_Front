import type { ApiResponse } from '@/shared/api/baseTypes';
import type {
  AuthProvider,
  SocialLoginRequest,
  SocialLoginResult,
  TermAgreeRequest,
} from '@/shared/api/models';

export type AuthProviderType = AuthProvider;
export type SocialLoginRequestType = ApiResponse<SocialLoginRequest>;
export type SocialLoginResponseType = ApiResponse<SocialLoginResult>;
export type TermAgreeRequestType = ApiResponse<TermAgreeRequest>;
