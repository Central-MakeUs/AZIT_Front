import { useEffect, type ReactNode } from 'react';
import { HTTPError } from 'ky';
import { useFlow } from '@/app/routes/stackflow';
import { useAuthStore } from '@/shared/store/auth';
import { postReissueToken } from '@/features/auth/api/postReissueToken';

interface AuthInitializerProps {
  children: ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const { replace } = useFlow();
  const { isInitialized, setAccessToken, setIsInitialized } = useAuthStore();

  useEffect(() => {
    // 리액트 라이프사이클 중 최초 렌더링시에만 실행
    if (isInitialized) return;

    const initAuth = async () => {
      try {
        const {
          result: { accessToken, status },
        } = await postReissueToken();

        setAccessToken(accessToken);
        switch (status) {
          case 'PENDING_TERMS':
            replace('TermAgreePage', {}, { animate: false });
            break;
          case 'PENDING_ONBOARDING':
            replace('OnboardingPage', {}, { animate: false });
            break;
          case 'ACTIVE':
            break;
        }
      } catch (error) {
        if (error instanceof HTTPError && error.response.status === 401) {
          console.error('401 error occurred', error);
          replace('LoginPage', {}, { animate: false });
        } else {
          // TODO: 에러 처리
          console.error(error);
        }
      } finally {
        setIsInitialized(true);
      }
    };

    initAuth();
  }, [isInitialized]);

  if (!isInitialized) return <></>;

  return <>{children}</>;
}
