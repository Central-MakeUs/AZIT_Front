import ky from 'ky';
import { useAuthStore } from '../store/auth';
import { BASE_API_URL } from '../constants/url';
import { postReissueToken } from './postReissueToken';

export const baseApi = ky.create({
  prefixUrl: BASE_API_URL,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  retry: 2,
});

export const authApi = baseApi.extend({
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
          const tokenResponse = await postReissueToken();

          if (tokenResponse.ok) {
            const accessToken = tokenResponse.data.result.accessToken;
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
