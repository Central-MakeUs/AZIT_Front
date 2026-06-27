import { Button } from '@azit/design-system/button';

import * as styles from '@/features/Schedule/schedule-filter-tab/styles/ScheduleFilterTab.css';

import { RUN_TYPE, RUN_TYPE_LABEL } from '@/shared/constants/run-type';
import type { RunType } from '@/shared/types/schedule';

interface ScheduleFilterTabProps {
  activeFilter: RunType;
  onFilterChange: (filter: RunType) => void;
}

const FILTERS: { label: string; value: RunType }[] = [
  { label: '전체', value: undefined },
  { label: RUN_TYPE_LABEL[RUN_TYPE.REGULAR], value: RUN_TYPE.REGULAR },
  { label: RUN_TYPE_LABEL[RUN_TYPE.LIGHTNING], value: RUN_TYPE.LIGHTNING },
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
          className={
            activeFilter === filter.value
              ? styles.activeButton
              : styles.inactiveButton
          }
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
