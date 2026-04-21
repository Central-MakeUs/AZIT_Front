import type { useFlow } from '@/app/routes/stackflow';
import type { ActivityName } from '@/app/routes/types';

import type { SocialLoginResult } from '@/shared/api/models/auth';

type Replace = ReturnType<typeof useFlow>['replace'];

type NavigateByAuthStatusParams = {
  status: SocialLoginResult['status'];
  crewId?: number;
  replace: Replace;
};

export const navigateByAuthStatus = ({
  status,
  crewId,
  replace,
}: NavigateByAuthStatusParams): ActivityName => {
  switch (status) {
    case 'PENDING_TERMS':
      replace('TermAgreePage', {}, { animate: false });
      return 'TermAgreePage';
    case 'PENDING_ONBOARDING':
      replace('OnboardingPage', {}, { animate: false });
      return 'OnboardingPage';
    case 'ACTIVE':
      replace('HomePage', {}, { animate: false });
      return 'HomePage';
    case 'WAITING_FOR_APPROVE':
    case 'APPROVED_PENDING_CONFIRM':
    case 'REJECTED_PENDING_CONFIRM':
      replace('CrewJoinStatusPage', { crewId }, { animate: false });
      return 'CrewJoinStatusPage';
    case 'KICKED_PENDING_CONFIRM':
      replace('CrewBannedStatusPage', {}, { animate: false });
      return 'CrewBannedStatusPage';
    default:
      replace('LoginPage', {}, { animate: false });
      return 'LoginPage' as ActivityName;
  }
};
