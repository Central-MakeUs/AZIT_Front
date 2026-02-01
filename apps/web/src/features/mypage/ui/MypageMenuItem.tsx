import { ChevronRightIcon } from '@azit/design-system';
import type { ActivityName } from '@/app/routes/types';
import * as styles from '../styles/MypageMenuItem.css';
import type { MypageMenuItem as MypageMenuItemType } from '@/shared/mock/mypage';

interface MypageMenuItemProps {
  item: MypageMenuItemType;
  onClick?: (path: ActivityName) => void;
}

export function MypageMenuItem({ item, onClick }: MypageMenuItemProps) {
  const handleClick = () => {
    if (item.path && onClick) {
      onClick(item.path as ActivityName);
    }
  };

  const isClickable = Boolean(item.path && onClick);

  return (
    <div
      className={
        isClickable ? `${styles.item} ${styles.itemClickable}` : styles.item
      }
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
    >
      <span className={styles.label}>{item.label}</span>
      <ChevronRightIcon size={20} color="secondary" />
    </div>
  );
}
