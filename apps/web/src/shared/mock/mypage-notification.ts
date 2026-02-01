export interface NotificationSettingItem {
  id: string;
  label: string;
  enabled: boolean;
}

export const mockNotificationSettings: NotificationSettingItem[] = [
  { id: 'regular-run', label: '정기런 알림', enabled: true },
  { id: 'flash-run', label: '번개런 알림', enabled: false },
];
