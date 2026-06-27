import type { ReactNode } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import type { ScheduleListItem as ScheduleListItemType } from '@/entities/Schedule/model/schedule.types';
import * as styles from '@/entities/Schedule/styles/ScheduleList.css.ts';
import { ScheduleListItem } from '@/entities/Schedule/ui/ScheduleListItem';

interface ScheduleListProps {
  items: ScheduleListItemType[];
  emptyState: ReactNode;
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
    if (items.length === 0 || isLoading) return emptyState;

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
