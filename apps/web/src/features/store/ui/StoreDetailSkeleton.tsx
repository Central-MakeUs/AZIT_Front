import * as styles from '../styles/StoreDetailSkeleton.css';

export function StoreDetailSkeleton() {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.imageBlock} />
        <div className={styles.contentWrapper}>
          <div className={styles.infoContainer}>
            <div className={styles.brandNameLine} />
            <div className={styles.productNameLine} />
            <div className={styles.priceContainer}>
              <div className={styles.originalPriceLine} />
              <div className={styles.discountLine} />
            </div>
          </div>
          <div className={styles.detailsSection}>
            <div className={styles.bannerLine} />
            <div className={styles.detailTextLine} />
            <div className={styles.detailTextLine} />
          </div>
          <div className={styles.descriptionSection}>
            <div className={styles.descriptionTitleLine} />
            <div className={styles.descriptionLine} />
            <div className={styles.descriptionLine} />
            <div className={styles.descriptionLine} />
          </div>
        </div>
        <div className={styles.moreInfoPlaceholder} />
      </div>
      <div className={styles.footerWrapper}>
        <div className={styles.buttonBlock} />
      </div>
    </>
  );
}
