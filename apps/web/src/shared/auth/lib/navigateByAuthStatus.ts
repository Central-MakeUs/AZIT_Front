import type { useFlow } from '@/app/routes/stackflow';
import type { ActivityName } from '@/app/routes/types';

import type { SocialLoginResult } from '@/shared/api/models/auth';

type Replace = ReturnType<typeof useFlow>['replace'];

type NavigateByAuthStatusParams = {
  status: SocialLoginResult['status'];
  currentActivity: ActivityName;
  replace: Replace;
};

const inactiveActivities: ActivityName[] = [
  'LoginPage',
  'OnboardingTermAgreePage',
  'OnboardingPage',
];

export const navigateByAuthStatus = ({
  status,
  currentActivity,
  replace,
}: NavigateByAuthStatusParams): ActivityName => {
  switch (status) {
    case 'PENDING_TERMS':
      if (currentActivity !== 'OnboardingTermAgreePage') {
        replace('OnboardingTermAgreePage', {}, { animate: false });
      }
      return 'OnboardingTermAgreePage';
    case 'ACTIVE':
      if (inactiveActivities.includes(currentActivity)) {
        replace('HomePage', {}, { animate: false });
      }
      return 'HomePage';
    default:
      replace('LoginPage', {}, { animate: false });
      return 'LoginPage';
  }
};
