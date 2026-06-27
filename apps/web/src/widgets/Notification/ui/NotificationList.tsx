import { useState, useMemo } from 'react';

import * as styles from '@/widgets/Notification/styles/NotificationList.css.ts';

import { ScheduleFilterTab } from '@/features/Schedule/schedule-filter-tab/ui';

import type { NotificationItem } from '@/shared/mock/notification';
import type { RunType } from '@/shared/types/schedule';

import { NotificationListItem } from './NotificationListItem';

interface NotificationListProps {
  items: NotificationItem[];
}

export function NotificationList({ items }: NotificationListProps) {
  const [activeFilter, setActiveFilter] = useState<RunType>(undefined);

  const filteredNotifications = useMemo(() => {
    if (activeFilter === undefined) {
      return items;
    }
    return items.filter(
      (item) =>
        item.type === (activeFilter === 'REGULAR' ? 'regular' : 'lightning')
    );
  }, [activeFilter, items]);

  return (
    <div className={styles.listContainer}>
      <div className={styles.filterContainer}>
        <ScheduleFilterTab
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <div className={styles.itemsContainer}>
        {filteredNotifications.map((item) => (
          <NotificationListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
