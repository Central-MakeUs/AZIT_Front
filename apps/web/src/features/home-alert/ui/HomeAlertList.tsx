import { useState, useMemo } from 'react';
import { BellIcon } from '@azit/design-system/icon';
import {
  ScheduleFilterTab,
  type ScheduleFilterType,
} from '@/widgets/schedule-filter-tab/ui';
import { HomeAlertListItem } from './HomeAlertListItem';
import { mockHomeAlertList, type AlertType } from '@/shared/mock/home-alert';
import * as styles from '../styles/HomeAlertList.css';

export function HomeAlertList() {
  const [activeFilter, setActiveFilter] = useState<ScheduleFilterType>('all');

  const filteredAlerts = useMemo(() => {
    if (activeFilter === 'all') {
      return mockHomeAlertList;
    }
    return mockHomeAlertList.filter(
      (item) => item.type === (activeFilter as AlertType)
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
