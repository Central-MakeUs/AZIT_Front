import type {
  ApiResponse,
  ApiResponseWithoutResult,
} from '@/shared/api/baseTypes';
import type { CreateCrewResult } from '@/shared/api/models';

export type CreateCrewResponseType =
  | ApiResponse<CreateCrewResult>
  | ApiResponseWithoutResult;
export type TermAgreeResponseType = ApiResponse<{}> | ApiResponseWithoutResult;
