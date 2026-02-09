import type { DeliveryAddressResult } from '@/shared/api/models';
import { Chip } from '@azit/design-system/chip';
import * as styles from '../styles/AddressCard.css';

interface AddressCardProps {
  address: DeliveryAddressResult;
  handleDelete?: (id: number) => void;
  handleEdit?: (id: number) => void;
  handleSetDefault?: (id: number) => void;
  isDefault: boolean;
}

export function AddressCard({
  address,
  handleDelete,
  handleEdit,
  handleSetDefault,
  isDefault,
}: AddressCardProps) {
  const fullAddress = `${address.baseAddress} ${address.detailAddress}`;

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).tagName === 'BUTTON'
    ) {
      return;
    }

    if (!isDefault && handleSetDefault) {
      handleSetDefault(address.id);
    }
  };

  return (
    <div
      className={isDefault ? styles.cardDefault : styles.cardNormal}
      onClick={handleCardClick}
    >
      <div className={styles.contentSection}>
        {isDefault && <Chip type="opacity">기본 배송지</Chip>}
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
          onClick={() => handleDelete?.(address.id)}
        >
          삭제
        </button>
        <button
          type="button"
          className={styles.editButton}
          onClick={() => handleEdit?.(address.id)}
        >
          수정
        </button>
      </div>
    </div>
  );
}
