import type { NotificationSettingItem as NotificationSettingItemType } from '@/shared/mock/mypage-notification';
import * as styles from '../styles/NotificationSettingItem.css';
import clsx from 'clsx';

interface NotificationSettingItemProps {
  item: NotificationSettingItemType;
  onToggle: (id: string, enabled: boolean) => void;
}

export function NotificationSettingItem({
  item,
  onToggle,
}: NotificationSettingItemProps) {
  const handleClick = () => {
    onToggle(item.id, !item.enabled);
  };

  return (
    <div className={styles.item}>
      <span className={styles.label}>{item.label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={item.enabled}
        aria-label={`${item.label} ${item.enabled ? '켜짐' : '꺼짐'}`}
        className={clsx(
          styles.switchTrack,
          item.enabled ? styles.switchTrackOn : styles.switchTrackOff
        )}
        onClick={handleClick}
      >
        <span
          className={clsx(
            styles.switchThumb,
            item.enabled ? styles.switchThumbOn : styles.switchThumbOff
          )}
          aria-hidden
        />
      </button>
    </div>
  );
}
