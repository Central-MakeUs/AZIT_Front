import * as styles from '@/features/mypage-notification/styles/NotificationSettingsList.css';
import { NotificationSettingItem } from '@/features/mypage-notification/ui/NotificationSettingItem';

import type { NotificationSettingItem as NotificationSettingItemType } from '@/shared/mock/mypage-notification';

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
