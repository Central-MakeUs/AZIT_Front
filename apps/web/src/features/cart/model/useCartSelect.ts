import { useState } from 'react';
import type { CartProductItem, CartBrand } from '../api/types';

interface UseCartSelectParams {
  allItems: CartProductItem[];
  cartData: CartBrand[];
}

export function useCartSelect({ allItems, cartData }: UseCartSelectParams) {
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(
    new Set()
  );

  const selectableItems = allItems.filter(
    (item) => !item.isOutOfStock && (item.quantity || 0) > 0
  );

  const selectedItems = (() => {
    const seen = new Set<number>();
    return selectableItems.filter((item) => {
      if (!selectedItemIds.has(String(item.id))) return false;
      const id = item.id;
      if (id == null || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  })();

  const isAllSelected =
    selectableItems.length > 0 &&
    selectedItems.length === selectableItems.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelectedIds = new Set(
        selectableItems.map((item) => String(item.id))
      );
      setSelectedItemIds(newSelectedIds);
    } else {
      setSelectedItemIds(new Set());
    }
  };

  const handleItemSelectChange = (itemId: string, checked: boolean) => {
    setSelectedItemIds((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(itemId);
      } else {
        newSet.delete(itemId);
      }
      return newSet;
    });
  };

  const handleBrandSelectChange = (brandId: string, checked: boolean) => {
    const brand = cartData.find((b) => b.id === brandId);
    if (!brand) return;

    const selectableItemsInBrand = brand.items.filter(
      (item) => !item.isOutOfStock && (item.quantity || 0) > 0
    );

    setSelectedItemIds((prev) => {
      const newSet = new Set(prev);
      selectableItemsInBrand.forEach((item) => {
        const itemId = String(item.id);
        if (checked) {
          newSet.add(itemId);
        } else {
          newSet.delete(itemId);
        }
      });
      return newSet;
    });
  };

  return {
    selectedItemIds,
    setSelectedItemIds,
    selectableItems,
    selectedItems,
    isAllSelected,
    handleSelectAll,
    handleItemSelectChange,
    handleBrandSelectChange,
  };
}
