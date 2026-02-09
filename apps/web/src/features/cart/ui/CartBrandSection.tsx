import { Checkbox } from '@azit/design-system/checkbox';
import { CartItem } from './CartItem';
import type { CartBrand } from '@/shared/api/models';
import * as styles from '../styles/CartBrandSection.css';

interface CartBrandSectionProps {
  brand: CartBrand;
  selectedItemIds: Set<string>;
  onItemSelectChange: (itemId: string, checked: boolean) => void;
  onBrandSelectChange: (brandId: string, checked: boolean) => void;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onDeleteItem: (itemId: string) => void;
}

export function CartBrandSection({
  brand,
  selectedItemIds,
  onItemSelectChange,
  onBrandSelectChange,
  onQuantityChange,
  onDeleteItem,
}: CartBrandSectionProps) {
  const selectableItems = brand.items.filter(
    (item) => !item.isOutOfStock && (item.quantity || 0) > 0
  );
  const selectedCount = selectableItems.filter((item) =>
    selectedItemIds.has(String(item.cartItemId))
  ).length;
  const isBrandSelected =
    selectableItems.length > 0 && selectedCount === selectableItems.length;
  const isIndeterminate =
    selectedCount > 0 && selectedCount < selectableItems.length;

  const handleBrandCheck = (checked: boolean) => {
    onBrandSelectChange(brand.id, checked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.brandHeader}>
        <Checkbox
          checked={isIndeterminate ? 'indeterminate' : isBrandSelected}
          onCheckedChange={(checked) => handleBrandCheck(checked === true)}
          disabled={selectableItems.length === 0}
        />
        <span className={styles.brandName}>{brand.name}</span>
      </div>
      <div className={styles.itemsWrapper}>
        {brand.items.map((item) => {
          const itemId = String(item.cartItemId);
          return (
            <CartItem
              key={itemId}
              item={item}
              isSelected={selectedItemIds.has(itemId)}
              onSelectChange={(checked) => onItemSelectChange(itemId, checked)}
              onQuantityChange={(quantity) =>
                onQuantityChange(itemId, quantity)
              }
              onDelete={() => onDeleteItem(itemId)}
            />
          );
        })}
      </div>
    </div>
  );
}
