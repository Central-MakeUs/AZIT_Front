import { useFlow } from '@/app/routes/stackflow';

import { getCrewMenu } from '@/pages/mypage/config/menu';

import type { MemberRole } from '@/entities/user/model';

export const useCrewMenu = (
  role: MemberRole,
  crewId: number,
  onReissueInvitationCode?: () => void
) => {
  const { push } = useFlow();
  return getCrewMenu(role, crewId, push, onReissueInvitationCode);
};
