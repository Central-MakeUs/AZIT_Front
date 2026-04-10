import { useCallback } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import { postSocialLogin } from '@/features/auth/api/postSocialLogin';

import type { AuthProvider } from '@/shared/api/models/auth';
import { AUTH_PROVIDER } from '@/shared/constants/auth';
import { bridge } from '@/shared/lib/bridge';
import { useAuthStore } from '@/shared/store/auth';

export const useSocialLogin = () => {
  const { replace } = useFlow();
  const { setAccessToken } = useAuthStore();

  const loginWith = useCallback(async (provider: AuthProvider) => {
    const type = provider === AUTH_PROVIDER.KAKAO ? 'kakao' : 'apple';

    // 1. Native SDK 실행 → Kakao: accessToken, Apple: authorizationCode 획득
    const authResult = await bridge.socialLogin(type);
    if (!authResult.success) {
      console.error(`OAuth 실패: ${authResult.message}`);
      return;
    }

    // 2. Web에서 백엔드 API 호출 (쿠키 설정을 위해 web에서 처리)
    const request =
      provider === AUTH_PROVIDER.KAKAO
        ? { accessToken: authResult.accessToken }
        : { authorizationCode: authResult.authorizationCode };
    const response = await postSocialLogin(provider, request);

    const { accessToken, status, crewId } = response.result;

    // 3. Zustand + SecureStore 동시 저장
    setAccessToken(accessToken);
    bridge.storeAccessToken(accessToken);

    // 4. 유저 상태에 따른 라우팅
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loginWith };
};
