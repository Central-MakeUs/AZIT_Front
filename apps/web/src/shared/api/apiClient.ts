import ky from 'ky';

import { postReissueToken } from '@/shared/api/handlers/postReissueToken';
import { createHttpMethods } from '@/shared/api/httpMethods';
import { BASE_API_URL } from '@/shared/constants/url';
import { useAuthStore } from '@/shared/store/auth';

let refreshPromise: Promise<string | undefined> | null = null;

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
          if (!refreshPromise) {
            refreshPromise = postReissueToken()
              .then((res) => res.result.accessToken)
              .catch(() => undefined)
              .finally(() => {
                refreshPromise = null;
              });
          }

          const newToken = await refreshPromise;

          if (newToken) {
            useAuthStore.getState().setAccessToken(newToken);
            return ky.retry({
              request: new Request(request),
              code: 'TOKEN_REFRESHED',
            });
          }

          useAuthStore.getState().setAccessToken(undefined);
          return response;
        }

        if (response.status === 403 && state.retryCount === 0) {
          try {
            const body = (await response.clone().json()) as { code?: string };
            if (body.code === 'INVALID_MEMBER_STATUS') {
              window.location.href = '/crew-join/status/banned';
            }
            // eslint-disable-next-line no-empty
          } catch (_error) {}

          return response;
        }

        return response;
      },
    ],
  },
});

export const base = createHttpMethods(baseApi);
export const auth = createHttpMethods(authApi);
