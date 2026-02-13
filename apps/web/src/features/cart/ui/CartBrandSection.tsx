import { Checkbox } from '@azit/design-system/checkbox';

import type { CartBrand } from '@/features/cart/api/types';
import { useCartContext } from '@/features/cart/context/CartContext';
import * as styles from '@/features/cart/styles/CartBrandSection.css';
import { CartItem } from '@/features/cart/ui/CartItem';

interface CartBrandSectionProps {
  brand: CartBrand;
}

export function CartBrandSection({ brand }: CartBrandSectionProps) {
  const { selectedItemIds, handleBrandSelectChange } = useCartContext();
  const selectableItems = brand.items.filter(
    (item) => !item.isOutOfStock && (item.quantity || 0) > 0
  );
  const selectedCount = selectableItems.filter((item) =>
    selectedItemIds.has(String(item.id))
  ).length;
  const isBrandSelected =
    selectableItems.length > 0 && selectedCount === selectableItems.length;
  const isIndeterminate =
    selectedCount > 0 && selectedCount < selectableItems.length;

  const handleBrandCheck = (checked: boolean) => {
    handleBrandSelectChange(brand.id, checked);
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
          const itemId = String(item.id);
          return <CartItem key={itemId} item={item} />;
        })}
      </div>
    </div>
  );
}
