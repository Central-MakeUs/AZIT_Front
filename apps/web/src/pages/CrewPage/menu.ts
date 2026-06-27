import type { ActivityName } from '@/app/routes/types';

import { MEMBER_ROLE } from '@/shared/constants/member-role';
import type { MenuGroup } from '@/shared/types/menu';

import type { MemberRole } from '@/entities/user/model';

type Push = (
  activity: ActivityName,
  params: Record<string, unknown>,
  options?: { animate?: boolean }
) => void;

export type { MenuItem, MenuGroup } from '@/shared/types/menu';

export const getCrewMenu = (
  role: MemberRole,
  crewId: number,
  push: Push,
  onReissueInvitationCode?: () => void
): MenuGroup[] => {
  const isLeader = role === MEMBER_ROLE.LEADER;

  return [
    {
      id: 'crew-activity',
      title: '크루 활동',
      items: [
        // {
        //   id: 'crew-card',
        //   label: '나의 크루증',
        //   type: 'navigation',
        //   onNavigate: () =>
        //     push('CrewCardPage' as ActivityName, {}, { animate: true }),
        // },
        {
          id: 'my-attendance',
          label: '출석 로그',
          type: 'navigation',
          onNavigate: () => push('AttendancePage', {}, { animate: true }),
        },
        ...(!isLeader
          ? [
              {
                id: 'member-list',
                label: '멤버 목록',
                type: 'navigation' as const,
                onNavigate: () =>
                  push('MemberViewPage', { id: crewId }, { animate: true }),
              },
            ]
          : []),
      ],
    },
    ...(isLeader
      ? [
          {
            id: 'crew-manage',
            title: '크루 관리',
            items: [
              {
                id: 'member-management',
                label: '멤버 관리',
                type: 'navigation' as const,
                onNavigate: () =>
                  push('MemberManagePage', { id: crewId }, { animate: true }),
              },
              {
                id: 'crew-info-edit',
                label: '크루 정보 수정',
                type: 'navigation' as const,
                onNavigate: () =>
                  push(
                    'CrewInfoEditPage' as ActivityName,
                    { id: crewId },
                    { animate: true }
                  ),
              },
              {
                id: 'invitation-code-reissue',
                label: '초대코드 재발급',
                type: 'action' as const,
                onAction: () => onReissueInvitationCode?.(),
              },
            ],
          },
        ]
      : []),
  ];
};
