import * as styles from '@/widgets/skeleton/styles/ScheduleAttendanceSkeleton.css';

export function ScheduleAttendanceSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.titleLine} aria-hidden />
      <div className={styles.buttonWrapper}>
        <div className={styles.rippleContainer}>
          <div className={styles.buttonCircle} aria-hidden />
        </div>
      </div>
      <div className={styles.distanceLine} aria-hidden />
    </div>
  );
}
