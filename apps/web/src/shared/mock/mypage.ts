export interface MypageProfile {
  avatarUrl: string | null;
  nickname: string;
  isLeader: boolean;
  attendanceCount: number;
  pointCount: number;
}

export interface MypageMenuItem {
  id: string;
  label: string;
  path?: string;
}

export interface MypageMenuSection {
  id: string;
  title: string;
  items: MypageMenuItem[];
}

export const mockMypageProfile: MypageProfile = {
  avatarUrl: null,
  nickname: '닉네임',
  isLeader: true,
  attendanceCount: 24,
  pointCount: 2400,
};

export const mockMypageMenuSections: MypageMenuSection[] = [
  {
    id: 'shopping',
    title: '쇼핑 관리',
    items: [
      { id: 'order-history', label: '주문 내역', path: 'OrderHistory' },
      { id: 'delivery-address', label: '배송지 설정' },
      { id: 'inquiry', label: '1:1 문의하기' },
    ],
  },
  {
    id: 'crew',
    title: '크루 활동',
    items: [
      { id: 'attendance-log', label: '출석 로그' },
      { id: 'member-management', label: '멤버 관리' },
    ],
  },
  {
    id: 'notification',
    title: '알림',
    items: [
      {
        id: 'notification-settings',
        label: '알림 설정',
        path: 'NotificationSettingsPage',
      },
    ],
  },
];
