import { Dropdown, type DropdownOption } from '@azit/design-system';
import type { OrderAddress } from '@/shared/mock/order';
import * as styles from '../styles/OrderAddressSection.css';

interface OrderAddressSectionProps {
  address: OrderAddress;
  onChangeAddress?: () => void;
}

const deliveryRequestOptions: DropdownOption[] = [
  { value: '1', label: '문 앞에 놓아주세요' },
  { value: '2', label: '경비실에 맡겨주세요' },
  { value: '3', label: '직접 받겠습니다' },
  { value: '4', label: '배송 전에 연락주세요' },
];

export function OrderAddressSection({
  address,
  onChangeAddress,
}: OrderAddressSectionProps) {
  return (
    <div className={styles.addressSection}>
      <div className={styles.header}>
        <p className={styles.title}>배송지</p>
        <button
          type="button"
          className={styles.changeButton}
          onClick={onChangeAddress}
        >
          변경하기
        </button>
      </div>
      <div className={styles.addressInfo}>
        <div className={styles.recipientInfo}>
          <p className={styles.recipientName}>{address.name}</p>
          <p className={styles.recipientPhone}>{address.phone}</p>
        </div>
        <p className={styles.address}>{address.address}</p>
      </div>
      <div className={styles.dropdownWrapper}>
        <Dropdown
          placeholder="배송 요청사항을 선택해주세요"
          options={deliveryRequestOptions}
        />
      </div>
    </div>
  );
}
