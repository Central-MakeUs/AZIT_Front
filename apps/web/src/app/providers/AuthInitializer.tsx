import { useEffect, type ReactNode } from 'react';
import { useFlow } from '@/app/routes/stackflow';
import { useAuthStore } from '@/shared/store/auth';
import { reissueToken } from '@/shared/api/auth';

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
        } = await reissueToken();

        switch (status) {
          case 'PENDING_TERMS':
            replace('TermAgreePage', {}, { animate: false });
            break;
          case 'PENDING_ONBOARDING':
            replace('OnboardingPage', {}, { animate: false });
            break;
          case 'ACTIVE':
            setAccessToken(accessToken);
            break;
          default:
        }

        setIsInitialized(true);
      } catch (_error) {
        replace('LoginPage', {}, { animate: false });
      }
    };

    initAuth();
  }, [isInitialized, setAccessToken, setIsInitialized, replace]);

  return <>{children}</>;
}
