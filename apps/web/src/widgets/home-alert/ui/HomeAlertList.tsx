import { BellIcon } from '@azit/design-system/icon';
import { useState, useMemo } from 'react';

import * as styles from '@/widgets/home-alert/styles/HomeAlertList.css.ts';
import { ScheduleFilterTab } from '@/widgets/schedule-filter-tab/ui';

import { mockHomeAlertList } from '@/shared/mock/home-alert';
import type { RunType } from '@/shared/types/schedule';

import { HomeAlertListItem } from './HomeAlertListItem';

export function HomeAlertList() {
  const [activeFilter, setActiveFilter] = useState<RunType>(undefined);

  const filteredAlerts = useMemo(() => {
    if (activeFilter === undefined) {
      return mockHomeAlertList;
    }
    return mockHomeAlertList.filter(
      (item) =>
        item.type === (activeFilter === 'REGULAR' ? 'regular' : 'lightning')
    );
  }, [activeFilter]);

  return (
    <div className={styles.listContainer}>
      <div className={styles.filterContainer}>
        <ScheduleFilterTab
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {filteredAlerts.length > 0 ? (
        <div className={styles.itemsContainer}>
          {filteredAlerts.map((item) => (
            <HomeAlertListItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <BellIcon size={64} className={styles.emptyStateIcon} aria-hidden />
          <p className={styles.emptyStateText}>새로운 소식을 기다려보세요!</p>
        </div>
      )}
    </div>
  );
}
