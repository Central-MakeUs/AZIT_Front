import { Button } from '@azit/design-system/button';

import * as styles from '@/widgets/schedule-filter-tab/styles/ScheduleFilterTab.css';

import type { RunType } from '@/entities/schedule/model/schedule.types';

interface ScheduleFilterTabProps {
  activeFilter: RunType;
  onFilterChange: (filter: RunType) => void;
}

const FILTERS: { label: string; value: RunType }[] = [
  { label: '전체', value: undefined },
  { label: '정기런', value: 'REGULAR' },
  { label: '번개런', value: 'LIGHTNING' },
];

export function ScheduleFilterTab({
  activeFilter,
  onFilterChange,
}: ScheduleFilterTabProps) {
  return (
    <div className={styles.tabsContainer}>
      {FILTERS.map((filter) => (
        <Button
          key={filter.label}
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
