import * as styles from '../styles/StoreSkeleton.css';

const SKELETON_ITEM_COUNT = 6;

function StoreSkeletonItem() {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageBlock} />
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <div className={styles.brandNameLine} />
          <div className={styles.productNameLine} />
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.originalPriceLine} />
          <div className={styles.discountLine} />
        </div>
      </div>
    </div>
  );
}

export function StoreSkeleton() {
  return (
    <div className={styles.gridContainer}>
      {Array.from({ length: SKELETON_ITEM_COUNT }, (_, index) => (
        <StoreSkeletonItem key={index} />
      ))}
    </div>
  );
}
