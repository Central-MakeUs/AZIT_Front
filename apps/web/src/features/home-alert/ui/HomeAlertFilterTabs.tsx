import { Button } from '@azit/design-system/button';
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
        <Button
          key={filter.value}
          size="small"
          state={activeFilter === filter.value ? 'active' : 'disabled_outline'}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
