import { Checkbox, XIcon } from '@azit/design-system';
import { clsx } from 'clsx';
import { QuantitySelector } from './QuantitySelector';
import type { CartItem as CartItemType } from '@/shared/mock/cart';
import * as styles from '../styles/CartItem.css';
import { formatPrice } from '@/shared/lib/formatters';

interface CartItemProps {
  item: CartItemType;
  isSelected: boolean;
  onSelectChange: (checked: boolean) => void;
  onQuantityChange: (quantity: number) => void;
  onDelete: () => void;
}

export function CartItem({
  item,
  isSelected,
  onSelectChange,
  onQuantityChange,
  onDelete,
}: CartItemProps) {
  const {
    name,
    size,
    expectedDelivery,
    originalPrice,
    discountedPrice,
    quantity,
    isSoldOut,
  } = item;

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className={styles.container}>
      <Checkbox
        checked={isSelected}
        onCheckedChange={(checked) => onSelectChange(checked === true)}
        disabled={isSoldOut}
      />
      <div className={styles.contentWrapper}>
        <div className={styles.productInfoRow}>
          <div className={styles.imageWrapper}>
            {isSoldOut && (
              <div className={styles.soldOutOverlay}>
                <span className={styles.soldOutText}>품절</span>
              </div>
            )}
          </div>
          <div className={styles.infoWrapper}>
            <div className={styles.titleSection}>
              <div className={styles.titleRow}>
                <span
                  className={clsx(
                    styles.productName,
                    isSoldOut && styles.productNameSoldOut
                  )}
                >
                  {name}
                </span>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={onDelete}
                  aria-label="상품 삭제"
                >
                  <XIcon size={20} />
                </button>
              </div>
              <span className={styles.deliveryInfo}>{expectedDelivery}</span>
            </div>
            <span
              className={clsx(
                styles.sizeText,
                isSoldOut && styles.sizeTextSoldOut
              )}
            >
              {size}
            </span>
          </div>
        </div>
        <div className={styles.bottomRow}>
          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            disabled={isSoldOut}
          />
          <div className={styles.priceWrapper}>
            <span className={styles.originalPrice}>
              {formatPrice(originalPrice)}
            </span>
            <span
              className={clsx(
                styles.discountedPrice,
                isSoldOut && styles.discountedPriceSoldOut
              )}
            >
              {formatPrice(discountedPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
