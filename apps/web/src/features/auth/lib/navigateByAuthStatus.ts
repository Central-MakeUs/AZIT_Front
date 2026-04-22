import type { useFlow } from '@/app/routes/stackflow';
import type { ActivityName } from '@/app/routes/types';

import type { SocialLoginResult } from '@/shared/api/models/auth';

type Replace = ReturnType<typeof useFlow>['replace'];

type NavigateByAuthStatusParams = {
  status: SocialLoginResult['status'];
  currentActivity: ActivityName;
  crewId?: number;
  replace: Replace;
};

const inactiveActivities: ActivityName[] = [
  'LoginPage',
  'TermAgreePage',
  'OnboardingPage',
];

export const navigateByAuthStatus = ({
  status,
  currentActivity,
  crewId,
  replace,
}: NavigateByAuthStatusParams): ActivityName => {
  switch (status) {
    case 'PENDING_TERMS':
      if (currentActivity !== 'TermAgreePage') {
        replace('TermAgreePage', {}, { animate: false });
      }
      return 'TermAgreePage';
    case 'PENDING_ONBOARDING':
      if (currentActivity !== 'OnboardingPage') {
        replace('OnboardingPage', {}, { animate: false });
      }
      return 'OnboardingPage';
    case 'ACTIVE':
      if (inactiveActivities.includes(currentActivity)) {
        replace('HomePage', {}, { animate: false });
      }
      return 'HomePage';
    case 'WAITING_FOR_APPROVE':
    case 'APPROVED_PENDING_CONFIRM':
    case 'REJECTED_PENDING_CONFIRM':
      if (currentActivity !== 'CrewJoinStatusPage') {
        replace('CrewJoinStatusPage', { crewId }, { animate: false });
      }
      return 'CrewJoinStatusPage';
    case 'KICKED_PENDING_CONFIRM':
      if (currentActivity !== 'CrewBannedStatusPage') {
        replace('CrewBannedStatusPage', {}, { animate: false });
      }
      return 'CrewBannedStatusPage';
    default:
      replace('LoginPage', {}, { animate: false });
      return 'LoginPage';
  }
};
