import * as styles from '@/features/Settings/styles/NotificationSettingsList.css';

import type { NotificationSettingItem as NotificationSettingItemType } from '@/shared/mock/mypage-notification';

import { NotificationSettingItem } from './NotificationSettingItem';


interface NotificationSettingsListProps {
  items: NotificationSettingItemType[];
  onToggle: (id: string, enabled: boolean) => void;
}

export function NotificationSettingsList({
  items,
  onToggle,
}: NotificationSettingsListProps) {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <NotificationSettingItem
          key={item.id}
          item={item}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
