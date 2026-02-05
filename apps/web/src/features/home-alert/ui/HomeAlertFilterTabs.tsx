import * as styles from '../styles/HomeAlertFilterTabs.css';
import type { AlertType } from '@/shared/mock/home-alert';

interface HomeAlertFilterTabsProps {
  activeFilter: AlertType;
  onFilterChange: (filter: AlertType) => void;
}

export function HomeAlertFilterTabs({
  activeFilter,
  onFilterChange,
}: HomeAlertFilterTabsProps) {
  const filters: { label: string; value: AlertType }[] = [
    { label: '전체', value: 'all' },
    { label: '정기런', value: 'regular' },
    { label: '번개런', value: 'lightning' },
  ];

  return (
    <div className={styles.tabsContainer}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={
            activeFilter === filter.value
              ? styles.tabButtonActive
              : styles.tabButton
          }
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
