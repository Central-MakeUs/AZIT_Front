import { ChevronRightIcon } from '@azit/design-system';
import * as styles from '../styles/MypageMenuItem.css';
import type { MypageMenuItem as MypageMenuItemType } from '@/shared/mock/mypage';

interface MypageMenuItemProps {
  item: MypageMenuItemType;
}

export function MypageMenuItem({ item }: MypageMenuItemProps) {
  return (
    <div className={styles.item}>
      <span className={styles.label}>{item.label}</span>
      <ChevronRightIcon size={20} color="secondary" />
    </div>
  );
}
