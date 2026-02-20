import { CopyIcon } from '@azit/design-system/icon';

import * as styles from '@/widgets/order-detail/styles/OrderDeliveryInfoSection.css';

import type { OrderStatus } from '@/entities/order/model';

interface OrderDeliveryInfoSectionProps {
  deliveryStatus: OrderStatus;
  deliveryCompany: string;
  trackingNumber: string;
  onCheckDelivery?: () => void;
  onCopyTrackingNumber?: () => void;
}

export function OrderDeliveryInfoSection({
  deliveryCompany,
  trackingNumber,
  onCopyTrackingNumber,
}: OrderDeliveryInfoSectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>배송 정보</h3>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.label}>택배사</span>
        <span className={styles.value}>{deliveryCompany}</span>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.label}>운송장 번호</span>
        <div className={styles.trackingNumberContainer}>
          <span className={styles.value}>{trackingNumber}</span>
          <button
            type="button"
            className={styles.copyButton}
            onClick={onCopyTrackingNumber}
          >
            <CopyIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
