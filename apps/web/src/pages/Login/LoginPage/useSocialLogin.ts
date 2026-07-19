import { useRef } from 'react';

import type { AuthProvider } from '@/shared/api/models/auth';
import { useKakaoLogin } from '@/shared/auth/model/useKakaoLogin';
import { AUTH_PROVIDER } from '@/shared/constants/auth';
import { APPLE_AUTHORIZE_URL } from '@/shared/constants/url';

export const useSocialLogin = () => {
  const { handleKakaoLogin } = useKakaoLogin({
    onError: (loginError) => {
      console.error(`로그인 실패 ${loginError.message}`);
    },
  });

  const loginWithKakao = () => {
    handleKakaoLogin();
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
