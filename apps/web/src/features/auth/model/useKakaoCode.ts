import { useEffect, useState } from 'react';

import { postSocialLogin } from '../api/postSocialLogin';

export const useKakaoCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [invalidAccess, setInvalidAccess] = useState(false);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
      login(code);
    } else {
      setInvalidAccess(true);
    }
  }, []);

  const login = async (code: string) => {
    setIsLoading(true);

    try {
      await postSocialLogin('KAKAO', {
        authorizationCode: code,
      });
    } catch (err) {
      setError(true);
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, invalidAccess };
};
