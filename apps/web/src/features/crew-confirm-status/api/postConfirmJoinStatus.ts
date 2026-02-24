import { auth } from '@/shared/api/apiClient';
import type { ApiResult } from '@/shared/api/apiHandler';
import type {
  ApiResponse,
  ApiResponseWithoutResult,
} from '@/shared/api/baseTypes';
import { postReissueToken } from '@/shared/api/handlers/postReissueToken';
import { END_POINT } from '@/shared/constants/endpoint';
import { useAuthStore } from '@/shared/store/auth';

type ConfirmJoinStatusResponseType = ApiResponse<{}> | ApiResponseWithoutResult;

export type ConfirmJoinStatusResult = ApiResult<
  ConfirmJoinStatusResponseType,
  ApiResponseWithoutResult
>;

export const postConfirmJoinStatus = () => {
  return auth.post<ConfirmJoinStatusResponseType>(
    END_POINT.ONBOARDING.CONFIRM_JOIN_STATUS,
    undefined,
    {
      hooks: {
        afterResponse: [
          async (_request, _options, response) => {
            const tokenResponse = await postReissueToken();
            if (tokenResponse.ok) {
              const accessToken = tokenResponse.data.result.accessToken;
              useAuthStore.getState().setAccessToken(accessToken);
            }

            return response;
          },
        ],
      },
    }
  );
};
