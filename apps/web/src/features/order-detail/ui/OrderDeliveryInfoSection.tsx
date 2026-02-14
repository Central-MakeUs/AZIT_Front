import { CopyIcon } from '@azit/design-system/icon';

import * as styles from '@/features/order-detail/styles/OrderDeliveryInfoSection.css.ts';

import type { OrderStatus } from '../api/types';

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
        {/* <button
          type="button"
          className={`${styles.checkButton} ${deliveryStatus !== 'SHIPPING' ? styles.disabled : ''}`}
          onClick={onCheckDelivery}
        >
          택배사에서 확인
        </button> */}
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
