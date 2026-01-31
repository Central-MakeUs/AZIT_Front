import type { NotificationSettingItem as NotificationSettingItemType } from '@/shared/mock/notification-settings';
import { NotificationSettingItem } from './NotificationSettingItem';
import * as styles from '../styles/NotificationSettingsList.css';

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
