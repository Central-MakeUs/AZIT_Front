import { StoreGridSkeletonItem } from './StoreGridSkeletonItem';
import * as styles from '../styles/StoreGridSkeleton.css';

const SKELETON_ITEM_COUNT = 6;

export function StoreGridSkeleton() {
  return (
    <div className={styles.gridContainer}>
      {Array.from({ length: SKELETON_ITEM_COUNT }, (_, index) => (
        <StoreGridSkeletonItem key={index} />
      ))}
    </div>
  );
}
