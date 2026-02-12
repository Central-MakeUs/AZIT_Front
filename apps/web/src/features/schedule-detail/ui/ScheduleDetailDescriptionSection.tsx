import * as styles from '../styles/ScheduleDetailDescriptionSection.css';

interface ScheduleDetailDescriptionSectionProps {
  description: string;
}

export function ScheduleDetailDescriptionSection({
  description,
}: ScheduleDetailDescriptionSectionProps) {
  return (
    <div className={styles.section}>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
