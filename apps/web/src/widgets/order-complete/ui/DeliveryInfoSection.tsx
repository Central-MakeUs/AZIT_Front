import * as styles from '@/widgets/order-complete/styles/DeliveryInfoSection.css';

interface DeliveryInfoSectionProps {
  name: string;
  phone: string;
  address: string;
}

export function DeliveryInfoSection({
  name,
  phone,
  address,
}: DeliveryInfoSectionProps) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>배송 정보</p>
      <div className={styles.contentWrapper}>
        <div className={styles.infoRow}>
          <p className={styles.name}>{name}</p>
          <p className={styles.phone}>{phone}</p>
        </div>
        <p className={styles.address}>{address}</p>
      </div>
    </div>
  );
}
