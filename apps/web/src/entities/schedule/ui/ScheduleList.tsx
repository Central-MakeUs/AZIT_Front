import { Button } from '@azit/design-system/button';
import { CalendarIcon } from '@azit/design-system/icon';

import { useFlow } from '@/app/routes/stackflow';

import type { ScheduleListItem as ScheduleListItemType } from '@/entities/schedule/model/schedule.types';
import * as styles from '@/entities/schedule/styles/ScheduleList.css.ts';
import { ScheduleListItem } from '@/entities/schedule/ui/ScheduleListItem';

interface ScheduleListProps {
  items: ScheduleListItemType[];
  isHomePage?: boolean;
}

export function ScheduleList({ items, isHomePage = false }: ScheduleListProps) {
  const { push } = useFlow();

  const handleClickItem = (item: ScheduleListItemType) => {
    push('ScheduleDetailPage', { id: item.scheduleId });
  };

  const renderItem = () => {
    if (items.length === 0) {
      if (isHomePage) {
        return (
          <div className={styles.emptyContainer}>
            <CalendarIcon size={64} color="secondary" strokeWidth={0.5} />
            <p className={styles.emptyText}>일정 탭에서 일정을 추가해보세요!</p>
            <Button
              size="medium"
              state="outline"
              onClick={() => push('SchedulePage', {}, { animate: false })}
              className={styles.addScheduleButton}
            >
              일정 추가하기
            </Button>
          </div>
        );
      }
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
