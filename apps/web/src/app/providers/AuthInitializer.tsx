import { useStack } from '@stackflow/react';
import { useEffect, useRef, type ReactNode } from 'react';

import { useFlow } from '@/app/routes/stackflow';
import type { ActivityName } from '@/app/routes/types';

import { postReissueToken } from '@/shared/api/handlers/postReissueToken';
import { bridge } from '@/shared/lib/bridge';
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
        const { accessToken, status, crewId } = response.result;

        setAccessToken(accessToken);
        bridge.storeAccessToken(accessToken);

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
              redirectTargetRef.current = 'HomePage';
              replace('HomePage', {}, { animate: false });
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
          case 'KICKED_PENDING_CONFIRM':
            if (currentActivity !== 'CrewBannedStatusPage') {
              redirectTargetRef.current = 'CrewBannedStatusPage';
              replace('CrewBannedStatusPage', {}, { animate: false });
            }
            break;
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
    // isInitialized 변경 시에만 실행 (의도적)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  const isRedirecting =
    redirectTargetRef.current !== null &&
    currentActivity !== redirectTargetRef.current;

  if (!isInitialized || isRedirecting) return <PageLoader />;

  return <>{children}</>;
}
