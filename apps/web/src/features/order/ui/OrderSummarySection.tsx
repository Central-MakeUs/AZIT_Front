import * as styles from '@/features/order/styles/OrderSummarySection.css';

interface OrderSummarySectionProps {
  totalProductPrice: number;
  membershipDiscount: number;
  pointsDiscount: number;
  shippingFee: number;
  totalPayment: number;
}

export function OrderSummarySection({
  totalProductPrice,
  membershipDiscount,
  pointsDiscount,
  shippingFee,
  totalPayment,
}: OrderSummarySectionProps) {
  return (
    <div className={styles.summarySection}>
      <div className={styles.summaryContent}>
        <p className={styles.title}>예상 결제금액</p>
        <div className={styles.priceItems}>
          <div className={styles.priceItem}>
            <p className={styles.priceLabel}>총 상품금액</p>
            <p className={styles.priceValue}>
              {totalProductPrice.toLocaleString()}원
            </p>
          </div>
          <div className={styles.discountItem}>
            <p className={styles.discountLabel}>아지트 멤버십 할인</p>
            <p className={styles.discountValue}>
              -{membershipDiscount.toLocaleString()}원
            </p>
          </div>
          <div className={styles.discountItem}>
            <p className={styles.discountLabel}>아지트 포인트 할인</p>
            <p className={styles.discountValue}>
              {pointsDiscount.toLocaleString()}원
            </p>
          </div>
          <div className={styles.priceItem}>
            <p className={styles.priceLabel}>배송비</p>
            <p className={styles.priceValue}>
              {shippingFee.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.totalItem}>
        <p className={styles.totalLabel}>총 결제 금액</p>
        <p className={styles.totalValue}>{totalPayment.toLocaleString()}원</p>
      </div>
    </div>
  );
}
