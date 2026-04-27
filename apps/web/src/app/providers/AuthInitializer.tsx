import { useStack } from '@stackflow/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, type ReactNode } from 'react';

import { useFlow } from '@/app/routes/stackflow';
import type { ActivityName } from '@/app/routes/types';

import { navigateByAuthStatus } from '@/features/auth/lib/navigateByAuthStatus';

import { postReissueToken } from '@/shared/api/handlers/postReissueToken';
import { useAuthStore } from '@/shared/store/auth';
import { PageLoader } from '@/shared/ui/loading/PageLoader';

interface AuthInitializerProps {
  children: ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const { replace } = useFlow();
  const stack = useStack();
  const redirectTargetRef = useRef<ActivityName | null>(null);
  const queryClient = useQueryClient();

  const { isInitialized, setAccessToken, setIsInitialized } = useAuthStore();

  useEffect(() => {
    return useAuthStore.subscribe((state, prevState) => {
      if (prevState.accessToken && !state.accessToken) {
        queryClient.clear();
      }
    });
  }, [queryClient]);

  const currentActivity = stack.activities[stack.activities.length - 1]
    ?.name as ActivityName;

  useEffect(() => {
    if (isInitialized) return;

    const initAuth = async () => {
      try {
        const response = await postReissueToken();
        const { accessToken, status, crewId } = response.result;

        setAccessToken(accessToken);

        const target = navigateByAuthStatus({
          status,
          currentActivity,
          crewId,
          replace,
        });
        redirectTargetRef.current = target as ActivityName;
      } catch (error) {
        console.error('토큰 재발급 실패:', error);
        if (currentActivity !== 'LoginPage') {
          redirectTargetRef.current = 'LoginPage';
          replace('LoginPage', {}, { animate: false });
        }
      } finally {
        setIsInitialized(true);
        redirectTargetRef.current = null;
      }
    };

    initAuth();
    // isInitialized 변경 시에만 실행 (의도적)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  const isRedirecting =
    redirectTargetRef.current !== null &&
    currentActivity !== redirectTargetRef.current;

  if (!isInitialized || isRedirecting) return <PageLoader />;

  return <>{children}</>;
}
