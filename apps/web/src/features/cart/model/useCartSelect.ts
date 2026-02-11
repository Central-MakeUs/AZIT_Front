import { useState, useMemo, useCallback } from 'react';
import type { CartProductItem, CartBrand } from '../api/types';

interface UseCartSelectParams {
  allItems: CartProductItem[];
  cartData: CartBrand[];
}

export function useCartSelect({ allItems, cartData }: UseCartSelectParams) {
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(
    new Set()
  );

  const selectableItems = useMemo(() => {
    return allItems.filter(
      (item) => !item.isOutOfStock && (item.quantity || 0) > 0
    );
  }, [allItems]);

  const selectedItems = useMemo(() => {
    return selectableItems.filter((item) =>
      selectedItemIds.has(String(item.id))
    );
  }, [selectableItems, selectedItemIds]);

  const isAllSelected = useMemo(() => {
    return (
      selectableItems.length > 0 &&
      selectedItems.length === selectableItems.length
    );
  }, [selectableItems, selectedItems]);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        const newSelectedIds = new Set(
          selectableItems.map((item) => String(item.id))
        );
        setSelectedItemIds(newSelectedIds);
      } else {
        setSelectedItemIds(new Set());
      }
    },
    [selectableItems]
  );

  const handleItemSelectChange = useCallback(
    (itemId: string, checked: boolean) => {
      setSelectedItemIds((prev) => {
        const newSet = new Set(prev);
        if (checked) {
          newSet.add(itemId);
        } else {
          newSet.delete(itemId);
        }
        return newSet;
      });
    },
    []
  );

  const handleBrandSelectChange = useCallback(
    (brandId: string, checked: boolean) => {
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
    },
    [cartData]
  );

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
