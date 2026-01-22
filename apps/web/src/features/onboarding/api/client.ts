import { authApi } from '@/shared/api/apiClient';
import { postReissueToken } from '@/shared/api/postReissueToken';
import { useAuthStore } from '@/shared/store/auth';

// 약관동의, 온보딩시 기존 API 호출 후 액세스 토큰 재발급 로직 추가
export const onboardingApi = authApi.extend({
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 200) {
          const {
            result: { accessToken },
          } = await postReissueToken();

          if (accessToken) {
            useAuthStore.getState().setAccessToken(accessToken);
          }
        }
      },
    ],
  },
});
