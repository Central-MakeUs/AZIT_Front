import * as styles from '../styles/SchedulePreparationListItem.css';

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
