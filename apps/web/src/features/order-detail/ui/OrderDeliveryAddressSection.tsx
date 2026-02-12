import type { OrderDetailDeliveryInfo } from '../api/types';
import * as styles from '../styles/OrderDeliveryAddressSection.css';

interface OrderDeliveryAddressSectionProps {
  deliveryInfo: OrderDetailDeliveryInfo;
}

export function OrderDeliveryAddressSection({
  deliveryInfo,
}: OrderDeliveryAddressSectionProps) {
  const address = deliveryInfo
    ? [deliveryInfo.baseAddress, deliveryInfo.detailAddress]
        .filter(Boolean)
        .join(' ')
    : '';

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>배송지</h3>
      <div className={styles.addressInfo}>
        <p className={styles.recipient}>
          {deliveryInfo?.recipientName} {deliveryInfo?.phoneNumber}
        </p>
        <p className={styles.address}>{address}</p>
        {deliveryInfo?.shippingInstruction && (
          <p className={styles.deliveryMessage}>
            배송 메세지 : {deliveryInfo.shippingInstruction}
          </p>
        )}
      </div>
      <div className={styles.divider} />
    </div>
  );
}
