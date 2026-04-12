import { useCallback } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import { postSocialLogin } from '@/features/auth/api/postSocialLogin';
import { useKakaoLogin } from '@/features/auth/model/useKakaoLogin';

import type { AuthProvider } from '@/shared/api/models/auth';
import { AUTH_PROVIDER } from '@/shared/constants/auth';
import { APPLE_AUTHORIZE_URL } from '@/shared/constants/url';
import { bridge } from '@/shared/lib/bridge';
import { isWebView } from '@/shared/lib/env';
import { useAuthStore } from '@/shared/store/auth';

export const useSocialLogin = () => {
  const { replace } = useFlow();
  const { setAccessToken } = useAuthStore();
  const { handleKakaoLogin } = useKakaoLogin();

  const loginWith = useCallback(
    async (provider: AuthProvider) => {
      if (!isWebView()) {
        if (provider === AUTH_PROVIDER.KAKAO) {
          handleKakaoLogin();
        } else if (provider === AUTH_PROVIDER.APPLE) {
          window.location.href = APPLE_AUTHORIZE_URL;
        }
        return;
      }

      const type = provider === AUTH_PROVIDER.KAKAO ? 'kakao' : 'apple';

      const authResult = await bridge.socialLogin(type);
      if (!authResult.success) {
        console.error(`OAuth 실패: ${authResult.message}`);
        return;
      }

      const request =
        provider === AUTH_PROVIDER.KAKAO
          ? { accessToken: authResult.accessToken }
          : { authorizationCode: authResult.authorizationCode };
      const response = await postSocialLogin(provider, request);

      const { accessToken, status, crewId } = response.result;
      setAccessToken(accessToken);

      switch (status) {
        case 'PENDING_TERMS':
          replace('TermAgreePage', {}, { animate: false });
          break;
        case 'PENDING_ONBOARDING':
          replace('OnboardingPage', {}, { animate: false });
          break;
        case 'ACTIVE':
          replace('HomePage', {}, { animate: false });
          break;
        case 'WAITING_FOR_APPROVE':
        case 'APPROVED_PENDING_CONFIRM':
        case 'REJECTED_PENDING_CONFIRM':
          replace('CrewJoinStatusPage', { crewId }, { animate: false });
          break;
        case 'KICKED_PENDING_CONFIRM':
          replace('CrewBannedStatusPage', {}, { animate: false });
          break;
      }
    },
    [handleKakaoLogin]
  );

  return { loginWith };
};
