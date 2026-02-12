import { Dropdown, type DropdownOption } from '@azit/design-system/dropdown';
import type { DeliveryAddress } from '@/features/order/api/types';
import * as styles from '../styles/OrderAddressSection.css';
import type { Dispatch, SetStateAction } from 'react';

interface OrderAddressSectionProps {
  address: DeliveryAddress | null;
  onChangeAddress: () => void;
  deliveryMessage?: string;
  onChangeDeliveryMessage: Dispatch<SetStateAction<string | undefined>>;
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
  deliveryMessage,
  onChangeDeliveryMessage,
}: OrderAddressSectionProps) {
  const handleDeliveryMessageChange = (message: string) => {
    onChangeDeliveryMessage(message);
  };

  return (
    <div className={styles.addressSection}>
      <div className={styles.header}>
        <p className={styles.title}>배송지</p>
        <button
          type="button"
          className={styles.changeButton}
          onClick={onChangeAddress}
        >
          {address ? '변경하기' : '입력하기'}
        </button>
      </div>
      {address ? (
        <>
          <div className={styles.addressInfo}>
            <div className={styles.recipientInfo}>
              <p className={styles.recipientName}>{address.recipientName}</p>
              <p className={styles.recipientPhone}>{address.phoneNumber}</p>
            </div>
            <p className={styles.address}>
              {[address.baseAddress, address.detailAddress]
                .filter(Boolean)
                .join(' ')}
            </p>
          </div>
          <div className={styles.dropdownWrapper}>
            <Dropdown
              placeholder="배송 요청사항을 선택해주세요"
              options={deliveryRequestOptions}
              value={deliveryMessage}
              onValueChange={handleDeliveryMessageChange}
            />
          </div>
        </>
      ) : (
        <p className={styles.address}>배송지를 입력해주세요</p>
      )}
    </div>
  );
}
