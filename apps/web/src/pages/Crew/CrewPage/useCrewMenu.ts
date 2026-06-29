import { useFlow } from '@/app/routes/stackflow';

import { getCrewMenu } from './menu';

import type { MemberRole } from '@/entities/User/model';

export const useCrewMenu = (
  role: MemberRole,
  crewId: number,
  onReissueInvitationCode?: () => void
) => {
  const { push } = useFlow();
  return getCrewMenu(role, crewId, push, onReissueInvitationCode);
};
