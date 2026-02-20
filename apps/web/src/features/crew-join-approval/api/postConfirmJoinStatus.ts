import { auth } from '@/shared/api/apiClient';
import type { ApiResult } from '@/shared/api/apiHandler';
import type {
  ApiResponse,
  ApiResponseWithoutResult,
} from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

type ConfirmJoinStatusResponseType = ApiResponse<{}> | ApiResponseWithoutResult;

export type ConfirmJoinStatusResult = ApiResult<
  ConfirmJoinStatusResponseType,
  ApiResponseWithoutResult
>;

export const postConfirmJoinStatus = () => {
  return auth.post<ConfirmJoinStatusResponseType>(
    END_POINT.ONBOARDING.CONFIRM_JOIN_STATUS,
    undefined
  );
};
