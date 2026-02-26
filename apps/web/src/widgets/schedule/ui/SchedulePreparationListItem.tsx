import * as styles from '@/widgets/schedule/styles/SchedulePreparationListItem.css';

interface SchedulePreparationListItemProps {
  item: string;
}

export function SchedulePreparationListItem({
  item,
}: SchedulePreparationListItemProps) {
  return (
    <div className={styles.item}>
      <span className={styles.text}>{item}</span>
    </div>
  );
}
