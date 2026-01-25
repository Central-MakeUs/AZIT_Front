import type { PaymentMethod } from '@/shared/mock/order';
import * as styles from '../styles/OrderPaymentMethodSection.css';

interface OrderPaymentMethodSectionProps {
  paymentMethod: PaymentMethod;
}

export function OrderPaymentMethodSection({
  paymentMethod,
}: OrderPaymentMethodSectionProps) {
  return (
    <div className={styles.paymentMethodSection}>
      <p className={styles.title}>결제 수단</p>
      <div className={styles.paymentMethodContainer}>
        <div className={styles.paymentMethodCard}>
          <div className={styles.paymentMethodContent}>
            <img
              src={paymentMethod.logoUrl}
              alt={paymentMethod.name}
              className={styles.paymentLogo}
            />
            <p className={styles.paymentName}>{paymentMethod.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
