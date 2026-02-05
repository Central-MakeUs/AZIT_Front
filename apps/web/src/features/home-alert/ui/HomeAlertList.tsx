import { useState, useMemo } from 'react';
import { BellIcon } from '@azit/design-system/icon';
import { HomeAlertFilterTabs } from './HomeAlertFilterTabs';
import { HomeAlertListItem } from './HomeAlertListItem';
import { mockHomeAlertList, type AlertType } from '@/shared/mock/home-alert';
import * as styles from '../styles/HomeAlertList.css';

export function HomeAlertList() {
  const [activeFilter, setActiveFilter] = useState<AlertType>('all');

  const filteredAlerts = useMemo(() => {
    if (activeFilter === 'all') {
      return mockHomeAlertList;
    }
    return mockHomeAlertList.filter((item) => item.type === activeFilter);
  }, [activeFilter]);

  return (
    <div className={styles.listContainer}>
      <HomeAlertFilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
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
