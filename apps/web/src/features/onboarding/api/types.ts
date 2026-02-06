import type {
  ApiResponse,
  ApiResponseWithoutResult,
} from '@/shared/api/baseTypes';
import type { CreateCrewResult, CrewInfoResult } from '@/shared/api/models';

export type CreateCrewResponseType = ApiResponse<CreateCrewResult>;
export type JoinCrewResponseType = ApiResponse<{}>;
export type TermAgreeResponseType = ApiResponse<{}> | ApiResponseWithoutResult;
export type CrewInfoResponseType = ApiResponse<CrewInfoResult>;
