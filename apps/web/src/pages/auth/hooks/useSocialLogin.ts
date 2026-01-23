import { useKakaoLogin } from '@/features/auth/model';
import type { AuthProvider } from '@/shared/api/models';
import { AUTH_PROVIDER } from '@/shared/constants/auth';
import { APPLE_AUTHORIZE_URL } from '@/shared/constants/url';
import { useCallback } from 'react';

export const useSocialLogin = () => {
  const { handleKakaoLogin: loginWithKakao } = useKakaoLogin({
    onSuccess: () => {},
    onError: (loginError) => {
      console.error(`로그인 실패 ${loginError.message}`);
    },
  });

  const loginWithApple = () => {
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
