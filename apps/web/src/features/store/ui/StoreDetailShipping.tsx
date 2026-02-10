import * as styles from '../styles/StoreDetailShipping.css';

interface StoreDetailShippingProps {
  shippingFee?: number;
  expectedShippingDate?: string;
}

export function StoreDetailShipping({
  shippingFee,
  expectedShippingDate,
}: StoreDetailShippingProps) {
  if (shippingFee == null && !expectedShippingDate) return null;

  return (
    <div className={styles.container}>
      <p className={styles.label}>배송</p>
      <div className={styles.content}>
        {shippingFee != null && (
          <p className={styles.text}>
            {shippingFee === 0
              ? '무료 배송'
              : `배송비 ${shippingFee.toLocaleString()}원`}
          </p>
        )}
        {expectedShippingDate && (
          <p className={styles.text}>{expectedShippingDate}</p>
        )}
      </div>
    </div>
  );
}
