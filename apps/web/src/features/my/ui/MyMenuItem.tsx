import { ChevronRightIcon } from '@azit/design-system/icon';

import type { MenuItem } from '../model/menu';
import * as styles from '../styles/MyMenuItem.css';

interface MyMenuItemProps {
  item: MenuItem;
  onClick?: (item: MenuItem) => void;
}

export function MyMenuItem({ item, onClick }: MyMenuItemProps) {
  const handleClick = () => {
    onClick?.(item);
  };

  return (
    <div
      className={`${styles.item} ${styles.itemClickable}`}
      role={'button'}
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
      <ChevronRightIcon size={20} color="secondary" />
    </div>
  );
}
