import type { ActivityName } from '@/app/routes/types';

import { MEMBER_ROLE } from '@/shared/config/member-role';
import { KAKAO_INQUIRY_CHAT_URL } from '@/shared/constants/url';
import type { MyPageMenuGroup } from '@/shared/types/my-menu';

import type { MemberRole } from '@/entities/user/model';

export type { MenuItem, MyPageMenuGroup } from '@/shared/types/my-menu';

export const getMyPageMenu: (
  role: MemberRole,
  crewId: number
) => MyPageMenuGroup[] = (role, crewId) => {
  return [
    {
      id: 'shopping',
      title: '쇼핑 관리',
      items: [
        {
          id: 'order-history',
          label: '주문 내역',
          path: 'OrderHistory' as ActivityName,
          type: 'page',
        },
        {
          id: 'address',
          label: '배송지 설정',
          path: 'AddressSettingPage' as ActivityName,
          type: 'page',
        },
        {
          id: 'inquiry',
          label: '1:1 문의하기',
          type: 'external_link',
          url: KAKAO_INQUIRY_CHAT_URL,
        },
      ],
    },
    {
      id: 'crew',
      title: '크루 활동',
      items: [
        {
          id: 'member-management',
          label: role === MEMBER_ROLE.LEADER ? '멤버 관리' : '멤버 목록',
          path: (role === MEMBER_ROLE.LEADER
            ? 'MemberManagePage'
            : 'MemberViewPage') as ActivityName,
          type: 'page',
          pushParams: { id: crewId },
        },
      ],
    },
    {
      id: 'policy',
      title: '약관 및 정책',
      items: [
        {
          id: 'terms-of-service',
          label: '서비스 이용약관',
          path: 'TermDetailPage' as ActivityName,
          type: 'page',
        },
        {
          id: 'privacy-policy',
          label: '개인정보 처리방침',
          path: 'TermDetailPage' as ActivityName,
          type: 'page',
        },
        {
          id: 'third-party-info-agreement',
          label: '제 3자 정보제공 동의 내역',
          path: 'TermDetailPage' as ActivityName,
          type: 'page',
        },
      ],
    },
  ];
};
