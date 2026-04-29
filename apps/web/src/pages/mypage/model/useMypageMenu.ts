import { useFlow } from '@/app/routes/stackflow';

import { getMypageMenu } from '@/pages/mypage/config/menu';

import type { MemberRole } from '@/entities/user/model';

export const useMypageMenu = (role: MemberRole, crewId: number) => {
  const { push } = useFlow();
  return getMypageMenu(role, crewId, push);
};
