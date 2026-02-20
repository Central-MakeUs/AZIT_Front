import * as styles from '@/widgets/schedule/styles/SchedulePreparationList.css';
import { SchedulePreparationListItem } from '@/widgets/schedule/ui/SchedulePreparationListItem';

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
