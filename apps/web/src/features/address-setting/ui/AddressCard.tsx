import type { DeliveryAddress } from '@/shared/mock/address';
import * as styles from '../styles/AddressCard.css';

interface AddressCardProps {
  address: DeliveryAddress;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
}

export function AddressCard({ address, onDelete, onEdit }: AddressCardProps) {
  const fullAddress = `${address.baseAddress} ${address.detailAddress}`;

  return (
    <div className={styles.card}>
      <div className={styles.contentSection}>
        <div className={styles.recipientRow}>
          <span className={styles.recipientName}>{address.recipientName}</span>
          <span className={styles.recipientPhone}>{address.phoneNumber}</span>
        </div>
        <p className={styles.addressText}>{fullAddress}</p>
      </div>
      <div className={styles.buttonRow}>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => onDelete?.(address.id)}
        >
          삭제
        </button>
        <button
          type="button"
          className={styles.editButton}
          onClick={() => onEdit?.(address.id)}
        >
          수정
        </button>
      </div>
    </div>
  );
}
