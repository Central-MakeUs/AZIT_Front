import { useEffect, useRef, type ReactNode } from 'react';
import { HTTPError } from 'ky';
import { useFlow } from '@/app/routes/stackflow';
import { useAuthStore } from '@/shared/store/auth';
import { postReissueToken } from '@/shared/api/postReissueToken';
import { useStack } from '@stackflow/react';
import type { ActivityName } from '../routes/types';

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
        const {
          result: { accessToken, status },
        } = await postReissueToken();

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
              redirectTargetRef.current = 'HomePage';
              replace('HomePage', {}, { animate: false });
            }
            break;
        }
      } catch (error) {
        if (error instanceof HTTPError && error.response.status === 401) {
          if (currentActivity !== 'LoginPage') {
            redirectTargetRef.current = 'LoginPage';
            replace('LoginPage', {}, { animate: false });
          }
        } else {
          console.error(error);
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

  if (!isInitialized || isRedirecting) return <></>;

  return <>{children}</>;
}
