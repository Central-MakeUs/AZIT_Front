import { ChevronRightIcon } from '@azit/design-system/icon';

import * as styles from '@/widgets/mypage/styles/MyMenuItem.css';

import type { MenuItem } from '@/shared/types/mypage-menu';

interface MyMenuItemProps {
  item: MenuItem;
  onClick?: (item: MenuItem) => void;
  statusLabel?: string | null;
}

export function MyMenuItem({
  item,
  onClick,
  statusLabel: statusLabelProp,
}: MyMenuItemProps) {
  const handleClick = () => {
    onClick?.(item);
  };

  const statusLabel = item.type === 'permission' ? statusLabelProp : null;

  return (
    <div
      className={`${styles.item} ${styles.itemClickable}`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <span className={styles.label}>{item.label}</span>
      {statusLabel != null && statusLabel !== '' ? (
        <span className={styles.statusLabel}>{statusLabel}</span>
      ) : (
        <ChevronRightIcon size={20} className={styles.pushIcon} />
      )}
    </div>
  );
}
