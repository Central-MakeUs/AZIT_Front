import { Divider } from '@azit/design-system/divider';

import * as styles from '../styles/CartSkeleton.css';

function CartItemSkeleton() {
  return (
    <div className={styles.cartItemRow}>
      <div className={styles.itemCheckbox} />
      <div className={styles.itemContent}>
        <div className={styles.itemProductRow}>
          <div className={styles.itemImage} />
          <div className={styles.itemInfo}>
            <div className={styles.itemTitleLine} />
            <div className={styles.itemDeliveryLine} />
            <div className={styles.itemSizeLine} />
          </div>
        </div>
        <div className={styles.itemBottomRow}>
          <div className={styles.itemQuantityBlock} />
          <div className={styles.itemPriceLine} />
        </div>
      </div>
    </div>
  );
}

function BrandSectionSkeleton() {
  return (
    <div className={styles.brandSection}>
      <div className={styles.brandHeader}>
        <div className={styles.brandCheckbox} />
        <div className={styles.brandNameLine} />
      </div>
      <div className={styles.itemsWrapper}>
        <CartItemSkeleton />
        <CartItemSkeleton />
      </div>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <>
      <div className={styles.selectionBar}>
        <div className={styles.selectionBarLeft}>
          <div className={styles.selectionCheckbox} />
          <div className={styles.selectionTextLine} />
        </div>
        <div className={styles.selectionDeleteButton} />
      </div>
      <Divider />
      <BrandSectionSkeleton />
      <Divider />
      <BrandSectionSkeleton />
      <Divider />
      <div className={styles.summaryWrapper}>
        <div className={styles.summarySection}>
          <div className={styles.summaryTitleLine} />
          <div className={styles.summaryPriceList}>
            <div className={styles.summaryPriceRow}>
              <div className={styles.summaryPriceLabel} />
              <div className={styles.summaryPriceValue} />
            </div>
            <div className={styles.summaryPriceRow}>
              <div className={styles.summaryPriceLabel} />
              <div className={styles.summaryPriceValue} />
            </div>
            <div className={styles.summaryPriceRow}>
              <div className={styles.summaryPriceLabel} />
              <div className={styles.summaryPriceValue} />
            </div>
          </div>
        </div>
        <Divider />
        <div className={styles.summaryTotalRow}>
          <div className={styles.summaryTotalLabel} />
          <div className={styles.summaryTotalValue} />
        </div>
      </div>
    </>
  );
}
