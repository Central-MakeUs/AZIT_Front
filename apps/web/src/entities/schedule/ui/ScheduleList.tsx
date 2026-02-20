import { useFlow } from '@/app/routes/stackflow';

import type { ScheduleListItem as ScheduleListItemType } from '../model/types';

import * as styles from '@/entities/schedule/styles/ScheduleList.css.ts';
import { ScheduleListItem } from '@/entities/schedule/ui/ScheduleListItem';

interface ScheduleListProps {
  items: ScheduleListItemType[];
}

export function ScheduleList({ items }: ScheduleListProps) {
  const { push } = useFlow();

  const handleClickItem = (item: ScheduleListItemType) => {
    push('ScheduleDetailPage', { id: item.scheduleId });
  };

  const renderItem = () => {
    if (items.length === 0) {
      return (
        <div className={styles.emptyContainer}>
          <p className={styles.emptyText}>등록된 일정이 없어요</p>
        </div>
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
