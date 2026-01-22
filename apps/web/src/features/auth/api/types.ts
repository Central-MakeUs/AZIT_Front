import type {
  ApiResponse,
  ApiResponseWithoutResult,
} from '@/shared/api/baseTypes';
import type { AuthProvider, SocialLoginResult } from '@/shared/api/models';

export type AuthProviderType = AuthProvider;
export type SocialLoginResponseType =
  | ApiResponse<SocialLoginResult>
  | ApiResponseWithoutResult;
