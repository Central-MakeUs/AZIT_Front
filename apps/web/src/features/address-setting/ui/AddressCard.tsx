import type { DeliveryAddress } from '@/shared/mock/address';
import { Chip } from '@azit/design-system/chip';
import * as styles from '../styles/AddressCard.css';

interface AddressCardProps {
  address: DeliveryAddress;
  handleDelete?: (id: number) => void;
  handleEdit?: (id: number) => void;
  handleSetDefault?: (id: number) => void;
}

export function AddressCard({
  address,
  handleDelete,
  handleEdit,
  handleSetDefault,
}: AddressCardProps) {
  const fullAddress = `${address.baseAddress} ${address.detailAddress}`;

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 버튼 클릭 시에는 카드 클릭 이벤트가 발생하지 않도록 처리
    if (
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).tagName === 'BUTTON'
    ) {
      return;
    }

    // 기본 배송지가 아닌 경우에만 기본 배송지로 설정
    if (!address.isDefault && handleSetDefault) {
      handleSetDefault(address.id);
    }
  };

  return (
    <div
      className={address.isDefault ? styles.cardDefault : styles.cardNormal}
      onClick={handleCardClick}
    >
      <div className={styles.contentSection}>
        {address.isDefault && <Chip type="opacity">기본 배송지</Chip>}
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
