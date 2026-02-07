import * as styles from '../styles/StoreGridSkeletonItem.css';

export function StoreGridSkeletonItem() {
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
