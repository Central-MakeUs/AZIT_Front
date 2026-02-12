import { formatPrice } from '@/shared/lib/formatters';
import * as styles from '../styles/PaymentInfoSection.css';

interface PaymentInfoSectionProps {
  totalProductPrice: number;
  membershipDiscount: number;
  pointDiscount: number;
  shippingFee: number;
  totalPayment: number;
}

export function PaymentInfoSection({
  totalProductPrice,
  membershipDiscount,
  // pointDiscount,
  shippingFee,
  totalPayment,
}: PaymentInfoSectionProps) {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <p className={styles.title}>결제금액</p>
        <div className={styles.detailsWrapper}>
          <div className={styles.detailRow}>
            <p className={styles.detailLabel}>총 상품금액</p>
            <p className={styles.detailValue}>
              {formatPrice(totalProductPrice)}
            </p>
          </div>
          <div className={styles.discountRow}>
            <p className={styles.discountLabel}>아지트 멤버십 할인</p>
            <p className={styles.discountValue}>
              -{formatPrice(membershipDiscount)}
            </p>
          </div>
          {/* <div className={styles.discountRow}>
            <p className={styles.discountLabel}>아지트 포인트 할인</p>
            <p className={styles.discountValue}>
              -{formatPrice(pointDiscount)}
            </p>
          </div> */}
          <div className={styles.detailRow}>
            <p className={styles.detailLabel}>배송비</p>
            <p className={styles.detailValue}>{formatPrice(shippingFee)}</p>
          </div>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.totalRow}>
        <p className={styles.totalLabel}>총 결제 금액</p>
        <p className={styles.totalValue}>{formatPrice(totalPayment)}</p>
      </div>
    </div>
  );
}
