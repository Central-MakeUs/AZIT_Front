import { useCallback, useRef } from 'react';

import { useKakaoLogin } from '@/features/auth/model';

import type { AuthProvider } from '@/shared/api/models/auth';
import { AUTH_PROVIDER } from '@/shared/constants/auth';
import {
  APPLE_AUTHORIZE_URL,
  // KAKAO_AUTHORIZE_URL,
  // KAKAO_REST_API_KEY,
} from '@/shared/constants/url';

export const useSocialLogin = () => {
  const { handleKakaoLogin } = useKakaoLogin({
    onSuccess: () => {},
    onError: (loginError) => {
      console.error(`로그인 실패 ${loginError.message}`);
    },
  });

  const loginWithKakao = () => {
    handleKakaoLogin();

    // const isAndroid = /Android/i.test(navigator.userAgent);

    // if (isAndroid) {
    //   window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_AUTHORIZE_URL}`;
    // } else {
    //   handleKakaoLogin();
    // }
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

  const loginWith = useCallback(async (provider: AuthProvider) => {
    switch (provider) {
      case AUTH_PROVIDER.KAKAO:
        return loginWithKakao();
      case AUTH_PROVIDER.APPLE:
        return loginWithApple();
      default:
        throw new Error('Invalid provider');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loginWith };
};
