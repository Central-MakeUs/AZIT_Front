import * as styles from '@/features/Schedule/schedule/styles/SchedulePreparationList.css';
import { SchedulePreparationListItem } from '@/features/Schedule/schedule/ui/SchedulePreparationListItem';

interface SchedulePreparationListProps {
  items: string[];
}

export function SchedulePreparationList({
  items,
}: SchedulePreparationListProps) {
  return (
    <div className={styles.section}>
      <h3 className={styles.title}>준비물</h3>
      <div className={styles.list}>
        {items.map((item) => (
          <SchedulePreparationListItem key={item} item={item} />
        ))}
      </div>
    </div>
  );
}
