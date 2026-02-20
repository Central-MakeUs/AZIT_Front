import { Chip } from '@azit/design-system/chip';
import clsx from 'clsx';

import * as styles from '@/widgets/home-alert/styles/HomeAlertListItem.css.ts';

import type { HomeAlertItem } from '@/shared/mock/home-alert';

interface HomeAlertListItemProps {
  item: HomeAlertItem;
}

export function HomeAlertListItem({ item }: HomeAlertListItemProps) {
  return (
    <div
      className={clsx(
        styles.itemContainer,
        !item.isRead && styles.itemContainerUnread
      )}
    >
      <div className={styles.contentContainer}>
        <div className={styles.mainText}>
          <span className={styles.dateText}>{item.date}에 </span>
          <Chip type={item.type === 'regular' ? 'primary' : 'secondary'}>
            {item.type === 'regular' ? '정기런' : '번개런'}
          </Chip>
          <span className={styles.dateText}> 이 등록되었어요</span>
        </div>
        <p className={styles.descriptionText}>{item.description}</p>
      </div>
      <span className={styles.timestampText}>{item.timestamp}</span>
    </div>
  );
}
