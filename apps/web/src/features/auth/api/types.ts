import type { ApiResponse } from '@/shared/api/baseTypes';
import type { AuthProvider, SocialLoginResult } from '@/shared/api/models/auth';

export type AuthProviderType = AuthProvider;
export type SocialLoginResponseType = ApiResponse<SocialLoginResult>;
