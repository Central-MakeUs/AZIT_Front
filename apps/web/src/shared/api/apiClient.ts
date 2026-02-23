import ky from 'ky';

import { postReissueToken } from '@/shared/api/handlers/postReissueToken';
import { createHttpMethods } from '@/shared/api/httpMethods';
import { BASE_API_URL } from '@/shared/constants/url';
import { useAuthStore } from '@/shared/store/auth';

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

        if (response.status === 403 && state.retryCount === 0) {
          const body = (await response.json()) as { code: string };
          const code = body.code;

          if (code === 'INVALID_MEMBER_STATUS') {
            window.location.href = '/crew-join/status';
          }

          return response;
        }

        return response;
      },
    ],
  },
});

export const base = createHttpMethods(baseApi);
export const auth = createHttpMethods(authApi);
