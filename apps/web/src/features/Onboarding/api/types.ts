import type {
  ApiResponse,
  ApiResponseWithoutResult,
} from '@/shared/api/baseTypes';

export type TermAgreeResponseType =
  | ApiResponse<Record<string, never>>
  | ApiResponseWithoutResult;
