import { useEffect, useState } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import { postSocialLogin } from '@/features/auth/api/postSocialLogin';

import { useAuthStore } from '@/shared/store/auth';

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
          replace('HomePage', {}, { animate: false });
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
