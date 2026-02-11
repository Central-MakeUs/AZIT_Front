import type { ActivityName } from '@/app/routes/types';

interface BaseMenuItem {
  id: string;
  label: string;
}

interface PageMenuItem extends BaseMenuItem {
  type: 'page';
  path: ActivityName;
  url?: never;
}

interface ExternalLinkMenuItem extends BaseMenuItem {
  type: 'external_link';
  url: string;
  path?: never;
}

export type MenuItem = PageMenuItem | ExternalLinkMenuItem;

export interface MyPageMenuGroup {
  id: string;
  title: string;
  items: MenuItem[];
}

export const getMyPageMenu: (role: string) => MyPageMenuGroup[] = (
  role: string
) => {
  return [
    {
      id: 'shopping',
      title: '쇼핑 관리',
      items: [
        {
          id: 'order-history',
          label: '주문 내역',
          path: 'OrderHistory',
          type: 'page',
        },
        {
          id: 'address',
          label: '배송지 설정',
          path: 'AddressSettingPage',
          type: 'page',
        },
        {
          id: 'inquiry',
          label: '1:1 문의하기',
          type: 'external_link',
          url: 'http://pf.kakao.com/_uxlqgn/chat',
        },
      ],
    },
    {
      id: 'crew',
      title: '크루 활동',
      items: [
        {
          id: 'member-management',
          label: role === '리더' ? '멤버 관리' : '멤버 목록',
          path: 'MemberManagementPage',
          type: 'page',
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
          path: 'TermDetailPage',
          type: 'page',
        },
        {
          id: 'privacy-policy',
          label: '개인정보 처리방침',
          path: 'TermDetailPage',
          type: 'page',
        },
        // {
        //   id: 'location-service-terms',
        //   label: '위치 기반 서비스 이용약관',
        //   path: 'TermDetailPage',
        //   type: 'page',
        // },
        {
          id: 'third-party-info-agreement',
          label: '제 3자 정보제공 동의 내역',
          path: 'TermDetailPage',
          type: 'page',
        },
      ],
    },
  ];
};
