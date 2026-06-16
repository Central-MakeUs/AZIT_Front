import type { ReactNode } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import type { ScheduleListItem as ScheduleListItemType } from '@/entities/schedule/model/schedule.types';
import * as styles from '@/entities/schedule/styles/ScheduleList.css.ts';
import { ScheduleListItem } from '@/entities/schedule/ui/ScheduleListItem';

interface ScheduleListProps {
  items: ScheduleListItemType[];
  emptyState?: ReactNode;
  isLoading?: boolean;
}

export function ScheduleList({
  items,
  emptyState,
  isLoading,
}: ScheduleListProps) {
  const { push } = useFlow();

  const handleClickItem = (item: ScheduleListItemType) => {
    push('ScheduleDetailPage', { id: item.scheduleId });
  };

  const renderItem = () => {
    if (isLoading) {
      return (
        <div className={styles.emptyContainer}>
          <p className={styles.emptyText}>등록된 일정이 없어요</p>
        </div>
      );
    }

    if (items.length === 0) {
      return (
        emptyState ?? (
          <div className={styles.emptyContainer}>
            <p className={styles.emptyText}>등록된 일정이 없어요</p>
          </div>
        )
      );
    }

    return items.map((item) => (
      <ScheduleListItem
        key={item.scheduleId}
        item={item}
        handleClick={() => handleClickItem(item)}
      />
    ));
  };

  return <div className={styles.listContainer}>{renderItem()}</div>;
}
