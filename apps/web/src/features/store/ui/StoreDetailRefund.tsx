import type { StoreProduct } from '@/shared/mock/store';
import * as styles from '../styles/StoreDetailRefund.css';

interface StoreDetailRefundProps {
  refundPolicy: StoreProduct['refundPolicy'];
}

export function StoreDetailRefund({ refundPolicy }: StoreDetailRefundProps) {
  if (!refundPolicy) return null;

  return (
    <div className={styles.container}>
      <p className={styles.label}>환불</p>
      <div className={styles.content}>
        <p className={styles.text}>{refundPolicy}</p>
      </div>
    </div>
  );
}
