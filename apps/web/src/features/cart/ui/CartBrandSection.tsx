import { Checkbox } from '@azit/design-system/checkbox';
import { CartItem } from './CartItem';
import type { CartBrand, CartItem as CartItemType } from '@/shared/mock/cart';
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
  const selectableItems = brand.items.filter((item) => !item.isSoldOut);
  const selectedCount = selectableItems.filter((item) =>
    selectedItemIds.has(item.id)
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
        {brand.items.map((item: CartItemType) => (
          <CartItem
            key={item.id}
            item={item}
            isSelected={selectedItemIds.has(item.id)}
            onSelectChange={(checked) => onItemSelectChange(item.id, checked)}
            onQuantityChange={(quantity) => onQuantityChange(item.id, quantity)}
            onDelete={() => onDeleteItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
