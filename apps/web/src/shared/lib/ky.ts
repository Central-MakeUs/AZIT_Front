import ky from 'ky';
import { useAuthStore } from './zustand';
import type { components } from '../api/apiTypes';
import type { ApiResponse } from '../api/baseTypes';

type ReissueTokenResult = components['schemas']['SocialLoginResponse'];
type ReissueTokenResponse = ApiResponse<ReissueTokenResult>;

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
  // Default Options
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  retry: 2,
  // Interceptor Hooks
  hooks: {
    beforeRequest: [
      (request) => {
        const { accessToken } = useAuthStore.getState();

        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    beforeError: [
      async (error) => {
        if (error.response) {
          error.message = `${error.message}: ${await error.response.text()}`;
        }
        return error;
      },
    ],
    afterResponse: [
      // 401 에러 발생시, 새 토큰으로 재시도
      async (request, _options, response, state) => {
        if (response.status === 401 && state.retryCount === 0) {
          const {
            result: { accessToken },
          } = await ky
            .post(`${import.meta.env.VITE_API_URL}/auth/reissue`, {
              credentials: 'include',
            })
            .json<ReissueTokenResponse>();

          if (accessToken) {
            useAuthStore.getState().setAccessToken(accessToken);

            return ky.retry({
              request: new Request(request),
              code: 'TOKEN_REFRESHED',
            });
          }

          return response;
        }
      },
    ],
  },
});
