import { MinusIcon, PlusIcon } from '@azit/design-system/icon';
import { clsx } from 'clsx';

import * as styles from '../styles/QuantitySelector.css';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled?: boolean;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  disabled = false,
}: QuantitySelectorProps) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        onClick={onDecrease}
        disabled={disabled || quantity <= 1}
        aria-label="수량 감소"
      >
        <MinusIcon size={16} />
      </button>
      <div
        className={clsx(
          styles.quantityDisplay,
          disabled && styles.quantityDisplayDisabled
        )}
      >
        {quantity}
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={onIncrease}
        disabled={disabled}
        aria-label="수량 증가"
      >
        <PlusIcon size={16} />
      </button>
    </div>
  );
}
