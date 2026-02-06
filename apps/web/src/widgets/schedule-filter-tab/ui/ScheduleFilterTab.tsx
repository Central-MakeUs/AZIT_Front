import { Button } from '@azit/design-system/button';
import * as styles from '../styles/ScheduleFilterTab.css';

export type ScheduleFilterType = 'all' | 'regular' | 'lightning';

interface ScheduleFilterTabProps {
  activeFilter: ScheduleFilterType;
  onFilterChange: (filter: ScheduleFilterType) => void;
}

const FILTERS: { label: string; value: ScheduleFilterType }[] = [
  { label: '전체', value: 'all' },
  { label: '정기런', value: 'regular' },
  { label: '번개런', value: 'lightning' },
];

export function ScheduleFilterTab({
  activeFilter,
  onFilterChange,
}: ScheduleFilterTabProps) {
  return (
    <div className={styles.tabsContainer}>
      {FILTERS.map((filter) => (
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
