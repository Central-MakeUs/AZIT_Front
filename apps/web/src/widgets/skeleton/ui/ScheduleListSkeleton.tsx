import * as styles from '@/widgets/skeleton/styles/ScheduleListSkeleton.css';

const SKELETON_ITEM_COUNT = 4;

function ScheduleListSkeletonItem() {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.dateBlock} />
      <div className={styles.contentContainer}>
        <div className={styles.tagsRow}>
          <div className={styles.tagLine} />
          <div className={styles.tagLine} />
        </div>
        <div className={styles.titleLine} />
        <div className={styles.detailsRow}>
          <div className={styles.detailLine} />
          <div className={styles.detailLine} />
          <div className={styles.detailLine} />
        </div>
      </div>
    </div>
  );
}

export function ScheduleListSkeleton() {
  return (
    <div className={styles.listContainer}>
      {Array.from({ length: SKELETON_ITEM_COUNT }, (_, index) => (
        <ScheduleListSkeletonItem key={index} />
      ))}
    </div>
  );
}
