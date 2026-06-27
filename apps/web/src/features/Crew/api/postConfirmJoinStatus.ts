import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { postReissueToken } from '@/shared/api/handlers/postReissueToken';
import { END_POINT } from '@/shared/constants/endpoint';
import { useAuthStore } from '@/shared/store/auth';

type ConfirmJoinStatusResponseType = ApiResponse<{}>;

export const postConfirmJoinStatus = () => {
  return auth.post<ConfirmJoinStatusResponseType>(
    END_POINT.ONBOARDING.CONFIRM_JOIN_STATUS,
    undefined,
    {
      hooks: {
        afterResponse: [
          async (_request, _options, response) => {
            const tokenResponse = await postReissueToken();
            if (tokenResponse.result?.accessToken) {
              useAuthStore
                .getState()
                .setAccessToken(tokenResponse.result.accessToken);
            }

            return response;
          },
        ],
      },
    }
  );
};
