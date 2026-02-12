import { useEffect, useState } from 'react';

import { postSocialLogin } from '../api/postSocialLogin';
import { useAuthStore } from '@/shared/store/auth';
import { useFlow } from '@/app/routes/stackflow';

export const useKakaoCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [invalidAccess, setInvalidAccess] = useState(false);

  const { setAccessToken } = useAuthStore();
  const { replace } = useFlow();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
      login(code);
    } else {
      setInvalidAccess(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (code: string) => {
    setIsLoading(true);

    try {
      const response = await postSocialLogin('KAKAO', {
        authorizationCode: code,
      });

      if (!response.ok) {
        throw response.error;
      }

      const { accessToken, status } = response.data.result;
      setAccessToken(accessToken);

      switch (status) {
        case 'PENDING_TERMS':
          replace('TermAgreePage', {}, { animate: false });
          break;
        case 'PENDING_ONBOARDING':
          replace('OnboardingPage', {}, { animate: false });
          break;
        case 'ACTIVE':
          replace('StorePage', {}, { animate: false });
          // 심사 위해 임시로 스토어 페이지를 홈페이지로 사용
          break;
      }
    } catch (err) {
      setError(true);
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, invalidAccess };
};
