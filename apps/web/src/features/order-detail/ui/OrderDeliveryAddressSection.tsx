import type { OrderAddress } from '@/shared/mock/order';
import * as styles from '../styles/OrderDeliveryAddressSection.css';

interface OrderDeliveryAddressSectionProps {
  address: OrderAddress;
  deliveryMessage?: string;
}

export function OrderDeliveryAddressSection({
  address,
  deliveryMessage,
}: OrderDeliveryAddressSectionProps) {
  return (
    <div className={styles.section}>
      <h3 className={styles.title}>배송지</h3>
      <div className={styles.addressInfo}>
        <p className={styles.recipient}>
          {address.name} {address.phone}
        </p>
        <p className={styles.address}>{address.address}</p>
        {deliveryMessage && (
          <p className={styles.deliveryMessage}>
            배송 메세지 : {deliveryMessage}
          </p>
        )}
      </div>
      <div className={styles.divider} />
    </div>
  );
}
