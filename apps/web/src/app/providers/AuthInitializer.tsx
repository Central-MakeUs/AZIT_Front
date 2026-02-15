import { useStack } from '@stackflow/react';
import { useEffect, useRef, type ReactNode } from 'react';

import { useFlow } from '@/app/routes/stackflow';
import type { ActivityName } from '@/app/routes/types';

import { postReissueToken } from '@/shared/api/handlers/postReissueToken';
import { useAuthStore } from '@/shared/store/auth';
import { PageLoader } from '@/shared/ui/loading/PageLoader';

interface AuthInitializerProps {
  children: ReactNode;
}

const inactiveActivities: ActivityName[] = [
  'LoginPage',
  'TermAgreePage',
  'OnboardingPage',
];

export function AuthInitializer({ children }: AuthInitializerProps) {
  const { replace } = useFlow();
  const stack = useStack();
  const redirectTargetRef = useRef<ActivityName | null>(null);

  const { isInitialized, setAccessToken, setIsInitialized } = useAuthStore();

  const currentActivity = stack.activities[stack.activities.length - 1]
    ?.name as ActivityName;

  useEffect(() => {
    if (isInitialized) return;

    const initAuth = async () => {
      try {
        const response = await postReissueToken();

        if (response.ok) {
          const { accessToken, status, crewId } = response.data.result;
          setAccessToken(accessToken);

          switch (status) {
            case 'PENDING_TERMS':
              if (currentActivity !== 'TermAgreePage') {
                redirectTargetRef.current = 'TermAgreePage';
                replace('TermAgreePage', {}, { animate: false });
              }
              break;
            case 'PENDING_ONBOARDING':
              if (currentActivity !== 'OnboardingPage') {
                redirectTargetRef.current = 'OnboardingPage';
                replace('OnboardingPage', {}, { animate: false });
              }
              break;
            case 'ACTIVE':
              if (inactiveActivities.includes(currentActivity)) {
                redirectTargetRef.current = 'StorePage';
                replace('StorePage', {}, { animate: false });
                // 심사 위해 임시로 스토어 페이지를 홈페이지로 사용
              }
              break;
            case 'WAITING_FOR_APPROVE':
            case 'APPROVED_PENDING_CONFIRM':
            case 'REJECTED_PENDING_CONFIRM':
              if (currentActivity !== 'CrewJoinStatusPage') {
                redirectTargetRef.current = 'CrewJoinStatusPage';
                replace('CrewJoinStatusPage', { crewId }, { animate: false });
              }
              break;
          }
        } else {
          if (response.status === 401) {
            if (currentActivity !== 'LoginPage') {
              redirectTargetRef.current = 'LoginPage';
              replace('LoginPage', {}, { animate: false });
            }
          } else {
            console.error(response.error);
          }
        }
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
  }, [isInitialized]);

  const isRedirecting =
    redirectTargetRef.current !== null &&
    currentActivity !== redirectTargetRef.current;

  if (!isInitialized || isRedirecting) return <PageLoader />;

  return <>{children}</>;
}
