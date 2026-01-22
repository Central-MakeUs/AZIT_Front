import type { StoreProduct } from '@/shared/mock/store';
import * as styles from '../styles/StoreDetailShipping.css';

interface StoreDetailShippingProps {
  shipping: StoreProduct['shipping'];
}

export function StoreDetailShipping({ shipping }: StoreDetailShippingProps) {
  if (!shipping) return null;

  return (
    <div className={styles.container}>
      <p className={styles.label}>배송</p>
      <div className={styles.content}>
        <p className={styles.text}>{shipping.type}</p>
        <p className={styles.text}>{shipping.estimatedDate}</p>
      </div>
    </div>
  );
}
