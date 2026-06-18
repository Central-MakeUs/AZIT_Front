export type AlertType = 'all' | 'regular' | 'lightning';

export interface NotificationItem {
  id: string;
  date: string;
  type: 'regular' | 'lightning';
  description: string;
  timestamp: string;
  isRead?: boolean;
}

export const mockNotificationList: NotificationItem[] = [];
