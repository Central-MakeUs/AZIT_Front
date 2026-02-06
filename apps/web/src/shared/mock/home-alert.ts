export type AlertType = 'all' | 'regular' | 'lightning';

export interface HomeAlertItem {
  id: string;
  date: string;
  type: 'regular' | 'lightning';
  description: string;
  timestamp: string;
  isRead?: boolean;
}

export const mockHomeAlertList: HomeAlertItem[] = [
  {
    id: '1',
    date: '1월 21일',
    type: 'regular',
    description: '상세 내용을 확인하고 참가 신청하세요!',
    timestamp: '1월 17일',
    isRead: false,
  },
  {
    id: '2',
    date: '1월 21일',
    type: 'regular',
    description: '상세 내용을 확인하고 참가 신청하세요!',
    timestamp: '1월 17일',
    isRead: true,
  },
  {
    id: '3',
    date: '1월 21일',
    type: 'lightning',
    description: '상세 내용을 확인하고 참가 신청하세요!',
    timestamp: '1월 17일',
    isRead: false,
  },
  {
    id: '4',
    date: '1월 21일',
    type: 'lightning',
    description: '상세 내용을 확인하고 참가 신청하세요!',
    timestamp: '1월 17일',
    isRead: true,
  },
];
