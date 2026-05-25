import type { ActivityName } from '@/app/routes/types';

import { MEMBER_ROLE } from '@/shared/constants/member-role';
import {
  GOOGLE_FORM_URL,
  KAKAO_INQUIRY_CHAT_URL,
} from '@/shared/constants/url';
import { openExternalUrl } from '@/shared/lib/openExternalUrl';
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
  push: Push
): MenuGroup[] => {
  const isLeader = role === MEMBER_ROLE.LEADER;

  return [
    {
      id: 'crew-activity',
      title: '크루 활동',
      items: [
        {
          id: 'crew-card',
          label: '나의 크루증',
          type: 'navigation',
          onNavigate: () =>
            push('CrewCardPage' as ActivityName, {}, { animate: true }),
        },
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
                id: 'member-list',
                label: '멤버 목록',
                type: 'navigation' as const,
                onNavigate: () =>
                  push('MemberViewPage', { id: crewId }, { animate: true }),
              },
              {
                id: 'crew-info-edit',
                label: '크루 정보 수정',
                type: 'navigation' as const,
                onNavigate: () =>
                  push(
                    'CrewInfoEditPage' as ActivityName,
                    {},
                    { animate: true }
                  ),
              },
              {
                id: 'invitation-code-reissue',
                label: '초대코드 재발급',
                type: 'navigation' as const,
                onNavigate: () =>
                  push(
                    'InvitationCodeReissuePage' as ActivityName,
                    {},
                    { animate: true }
                  ),
              },
            ],
          },
        ]
      : []),
  ];
};

export const getMypageMenu = (push: Push): MenuGroup[] => {
  return [
    {
      id: 'shopping',
      title: '쇼핑 관리',
      items: [
        {
          id: 'order-history',
          label: '주문 내역',
          type: 'navigation',
          onNavigate: () => push('OrderHistory', {}, { animate: true }),
        },
        {
          id: 'address',
          label: '배송지 설정',
          type: 'navigation',
          onNavigate: () => push('AddressSettingPage', {}, { animate: true }),
        },
        {
          id: 'inquiry',
          label: '1:1 문의하기',
          type: 'navigation',
          onNavigate: () => openExternalUrl(KAKAO_INQUIRY_CHAT_URL),
        },
      ],
    },
    {
      id: 'customer-support',
      title: '고객 지원',
      items: [
        {
          id: 'notice',
          label: '공지사항',
          type: 'action',
          onAction: () => {},
        },
        {
          id: 'inquiry-support',
          label: '1:1 문의하기',
          type: 'navigation',
          onNavigate: () => openExternalUrl(KAKAO_INQUIRY_CHAT_URL),
        },
        {
          id: 'feedback',
          label: '의견 남기기',
          type: 'navigation',
          onNavigate: () => openExternalUrl(GOOGLE_FORM_URL),
        },
        {
          id: 'policy',
          label: '약관 및 정책',
          type: 'navigation',
          onNavigate: () =>
            push(
              'TermDetailPage',
              { termType: 'terms-of-service' },
              { animate: true }
            ),
        },
      ],
    },
  ];
};
