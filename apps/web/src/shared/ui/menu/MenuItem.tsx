import { ChevronRightIcon } from '@azit/design-system/icon';
import { useEffect, useState } from 'react';

import type { MenuItem as MenuItemType } from '@/shared/types/menu';

import * as styles from './MenuItem.css';

interface MenuItemProps {
  item: MenuItemType;
  onClick?: (item: MenuItemType) => void;
}

export function MenuItem({ item, onClick }: MenuItemProps) {
  const [statusLabel, setStatusLabel] = useState<string | null>(null);

  useEffect(() => {
    if (item.type !== 'action' || !item.getStatusLabel) return;

    const fetch = () => {
      item.getStatusLabel!()
        .then(setStatusLabel)
        .catch(() => {});
    };

    fetch();
    window.addEventListener('focus', fetch);
    return () => window.removeEventListener('focus', fetch);
  }, [item]);

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
      {item.type === 'action' && item.getStatusLabel ? (
        <span className={styles.statusLabel}>{statusLabel ?? ''}</span>
      ) : (
        <ChevronRightIcon size={20} className={styles.pushIcon} />
      )}
    </div>
  );
}
