import { ChevronRightIcon } from '@azit/design-system/icon';
import * as styles from '../styles/MypageMenuItem.css';
import type { MenuItem } from '../model/menu';

interface MypageMenuItemProps {
  item: MenuItem;
  onClick?: (item: MenuItem) => void;
}

export function MypageMenuItem({ item, onClick }: MypageMenuItemProps) {
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
