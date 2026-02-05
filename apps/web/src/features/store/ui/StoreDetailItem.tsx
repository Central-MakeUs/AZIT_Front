import { MinusIcon, PlusIcon, XIcon } from '@azit/design-system/icon';
import * as styles from '../styles/StoreDetailItem.css';
import { useEffect, useState } from 'react';

interface StoreDetailItemProps {
  option?: string;
  onCancel: () => void;
}

export function StoreDetailItem({ option, onCancel }: StoreDetailItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(1);
  }, [option]);

  const handleCountChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setCount(count + 1);
    } else {
      setCount(Math.max(count - 1, 1));
    }
  };

  if (!option) return null;

  return (
    <div className={styles.container}>
      <XIcon className={styles.cancelButton} onClick={onCancel} />
      <p className={styles.optionText}>{option}</p>
      <p className={styles.shippingText}>1.6 화 이내 발송 예정</p>
      <div className={styles.bottomContainer}>
        <QuantitySelector count={count} onCountChange={handleCountChange} />
        <p className={styles.optionText}>16,000원</p>
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
