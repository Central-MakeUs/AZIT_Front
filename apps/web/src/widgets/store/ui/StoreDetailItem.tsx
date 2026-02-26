import { MinusIcon, PlusIcon, XIcon } from '@azit/design-system/icon';

import * as styles from '@/widgets/store/styles/StoreDetailItem.css';

import {
  formatExpectedShippingDate,
  formatPrice,
} from '@/shared/lib/formatters';

interface StoreDetailItemProps {
  option?: string;
  salePrice?: number;
  shippingDate?: string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onCancel: () => void;
}

export function StoreDetailItem({
  option,
  salePrice = 0,
  shippingDate,
  quantity,
  onQuantityChange,
  onCancel,
}: StoreDetailItemProps) {
  const handleCountChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      onQuantityChange(quantity + 1);
    } else {
      onQuantityChange(Math.max(quantity - 1, 1));
    }
  };

  if (!option) return null;

  return (
    <div className={styles.container}>
      <XIcon className={styles.cancelButton} onClick={onCancel} />
      <p className={styles.optionText}>{option}</p>
      <p className={styles.shippingText}>
        {formatExpectedShippingDate(shippingDate ?? '').replace('판매자', '')}
      </p>
      <div className={styles.bottomContainer}>
        <QuantitySelector count={quantity} onCountChange={handleCountChange} />
        <p className={styles.optionText}>{formatPrice(salePrice * quantity)}</p>
      </div>
    </div>
  );
}

interface QuantitySelectorProps {
  count: number;
  onCountChange: (type: 'increase' | 'decrease') => void;
}

function QuantitySelector({ count, onCountChange }: QuantitySelectorProps) {
  return (
    <div className={styles.quantitySelector}>
      <MinusIcon
        className={styles.quantitySelectorButton}
        onClick={() => onCountChange('decrease')}
      />
      <span className={styles.quantitySelectorCount}>{count}</span>
      <PlusIcon
        className={styles.quantitySelectorButton}
        onClick={() => onCountChange('increase')}
      />
    </div>
  );
}
