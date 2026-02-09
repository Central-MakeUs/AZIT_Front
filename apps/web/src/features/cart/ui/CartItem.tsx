import { Checkbox } from '@azit/design-system/checkbox';
import { XIcon } from '@azit/design-system/icon';
import { clsx } from 'clsx';
import { QuantitySelector } from './QuantitySelector';
import type { CartProductItem } from '@/shared/api/models';
import * as styles from '../styles/CartItem.css';
import { formatPrice } from '@/shared/lib/formatters';

interface CartItemProps {
  item: CartProductItem;
  isSelected: boolean;
  onSelectChange: (checked: boolean) => void;
  onQuantityChange: (quantity: number) => void;
  onDelete: () => void;
}

const formatExpectedDelivery = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    return `${month}.${day}(${weekday}) 이내 발송 예정`;
  } catch {
    return '';
  }
};

export function CartItem({
  item,
  isSelected,
  onSelectChange,
  onQuantityChange,
  onDelete,
}: CartItemProps) {
  const name = item.productName || '';
  const size = item.optionDescription || '';
  const expectedDelivery = item.expectedShippingDate
    ? formatExpectedDelivery(item.expectedShippingDate)
    : '';
  const originalPrice = item.basePrice || 0;
  const discountedPrice = item.salePrice || 0;
  const quantity = item.quantity || 0;
  const isSoldOut = item.isOutOfStock || quantity === 0;
  const imageUrl = item.productImageUrl;

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
            {imageUrl && (
              <img src={imageUrl} alt={name} className={styles.productImage} />
            )}
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
