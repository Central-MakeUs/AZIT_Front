import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/widgets/schedule-list/styles/ScheduleList.css';
import { ScheduleListItem } from '@/widgets/schedule-list/ui/ScheduleListItem';

import type { ScheduleItem } from '@/shared/mock/home';

interface ScheduleListProps {
  items: ScheduleItem[];
}

export function ScheduleList({ items }: ScheduleListProps) {
  const { push } = useFlow();

  const handleClickItem = (item: ScheduleItem) => {
    push('ScheduleDetailPage', { id: item.id });
  };

  return (
    <div className={styles.listContainer}>
      {items.map((item) => (
        <ScheduleListItem
          key={item.id}
          item={item}
          handleClick={() => handleClickItem(item)}
        />
      ))}
    </div>
  );
}
