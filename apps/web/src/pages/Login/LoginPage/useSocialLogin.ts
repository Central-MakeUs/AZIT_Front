import { useRef } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import type { AuthProvider } from '@/shared/api/models/auth';
import { postSocialLogin } from '@/shared/auth/api/postSocialLogin';
import { navigateByAuthStatus } from '@/shared/auth/lib/navigateByAuthStatus';
import { useKakaoLogin } from '@/shared/auth/model/useKakaoLogin';
import { AUTH_PROVIDER } from '@/shared/constants/auth';
import { APPLE_AUTHORIZE_URL } from '@/shared/constants/url';
import { bridge } from '@/shared/lib/bridge';
import { isWebView } from '@/shared/lib/env';
import { useAuthStore } from '@/shared/store/auth';

export const useSocialLogin = () => {
  const { replace } = useFlow();
  const { setAccessToken } = useAuthStore();

  const { handleKakaoLogin } = useKakaoLogin({
    onError: (loginError) => {
      console.error(`로그인 실패 ${loginError.message}`);
    },
  });

  const loginWithKakao = async () => {
    if (!isWebView()) {
      handleKakaoLogin();
      return;
    }

    const authResult = await bridge.socialLogin('kakao');
    if (!authResult.success) {
      console.error(`OAuth 실패: ${authResult.message}`);
      return;
    }

    const response = await postSocialLogin(AUTH_PROVIDER.KAKAO, {
      accessToken: authResult.accessToken,
    });

    const { accessToken, status } = response.result;
    setAccessToken(accessToken);
    navigateByAuthStatus({
      status,
      currentActivity: 'LoginPage',
      replace,
    });
  };

  const isDisabledRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const preventMultipleClicks = (ms: number) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    isDisabledRef.current = true;
    timeoutRef.current = window.setTimeout(() => {
      isDisabledRef.current = false;
      timeoutRef.current = null;
    }, ms);
  };

  const loginWithApple = () => {
    if (isDisabledRef.current) return;
    preventMultipleClicks(2000);
    window.location.href = `${APPLE_AUTHORIZE_URL}&state=${window.location.origin}`;
  };

  const loginWith = async (provider: AuthProvider) => {
    switch (provider) {
      case AUTH_PROVIDER.KAKAO:
        return loginWithKakao();
      case AUTH_PROVIDER.APPLE:
        return loginWithApple();
      default:
        throw new Error('Invalid provider');
    }
  };

  return { loginWith };
};
