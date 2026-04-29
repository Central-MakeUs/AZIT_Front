import { ChevronRightIcon } from '@azit/design-system/icon';

import * as styles from '@/widgets/settings/styles/MenuItem.css';

import type { MenuItem as MenuItemType } from '@/shared/types/menu';

interface MenuItemProps {
  item: MenuItemType;
  onClick?: (item: MenuItemType) => void;
  statusLabel?: string | null;
}

export function MenuItem({
  item,
  onClick,
  statusLabel: statusLabelProp,
}: MenuItemProps) {
  const handleClick = () => {
    onClick?.(item);
  };

  if (item.type === 'info') {
    return (
      <div className={styles.item}>
        <span className={styles.label}>{item.label}</span>
        <span className={styles.infoValue}>{item.value}</span>
      </div>
    );
  }

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
