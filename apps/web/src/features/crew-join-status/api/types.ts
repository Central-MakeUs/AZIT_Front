import type {
  ApiResponse,
  ApiResponseWithoutResult,
} from '@/shared/api/baseTypes';

export type ConfirmJoinStatusResponseType =
  | ApiResponse<{}>
  | ApiResponseWithoutResult;
