import { ChevronRightIcon } from '@azit/design-system/icon';

import * as styles from '@/widgets/my/styles/MyMenuItem.css';

import type { MenuItem } from '@/shared/types/my-menu';

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
      <ChevronRightIcon size={20} className={styles.pushIcon} />
    </div>
  );
}
