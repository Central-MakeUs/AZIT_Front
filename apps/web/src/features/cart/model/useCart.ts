import { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cartQueries } from '@/shared/api/queries/cart';
import type { CartProductItem, CartBrand } from '@/shared/api/models';

const transformCartData = (items: CartProductItem[]): CartBrand[] => {
  const brandMap = new Map<
    string,
    { name: string; items: CartProductItem[] }
  >();

  items.forEach((item) => {
    const brandName = item.brandName || '기타';
    const brandId = brandName.toLowerCase().replace(/\s+/g, '-');

    if (!brandMap.has(brandId)) {
      brandMap.set(brandId, { name: brandName, items: [] });
    }

    brandMap.get(brandId)!.items.push(item);
  });

  return Array.from(brandMap.entries()).map(([id, { name, items }]) => ({
    id,
    name,
    items,
  }));
};

export function useCart() {
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(
    new Set()
  );

  const { data: cartProductsResponse, isPending } = useQuery(
    cartQueries.productsQuery()
  );

  const cartData = useMemo(() => {
    if (!cartProductsResponse?.ok || !cartProductsResponse.data.result.items) {
      return [];
    }
    return transformCartData(cartProductsResponse.data.result.items);
  }, [cartProductsResponse]);

  const apiPriceInfo = useMemo(() => {
    if (!cartProductsResponse?.ok || !cartProductsResponse.data.result) {
      return null;
    }
    return {
      totalProductPrice:
        cartProductsResponse.data.result.totalProductPrice || 0,
      membershipDiscount:
        cartProductsResponse.data.result.membershipDiscount || 0,
      shippingFee: cartProductsResponse.data.result.shippingFee || 0,
      totalPaymentPrice:
        cartProductsResponse.data.result.totalPaymentPrice || 0,
    };
  }, [cartProductsResponse]);

  const allItems = useMemo(() => {
    return cartData.flatMap((brand) => brand.items);
  }, [cartData]);

  const selectableItems = useMemo(() => {
    return allItems.filter(
      (item) => !item.isOutOfStock && (item.quantity || 0) > 0
    );
  }, [allItems]);

  const selectedItems = useMemo(() => {
    return selectableItems.filter((item) =>
      selectedItemIds.has(String(item.cartItemId))
    );
  }, [selectableItems, selectedItemIds]);

  const isAllSelected = useMemo(() => {
    return (
      selectableItems.length > 0 &&
      selectedItems.length === selectableItems.length
    );
  }, [selectableItems, selectedItems]);

  const selectedTotalProductPrice = useMemo(() => {
    return selectedItems.reduce(
      (sum, item) => sum + (item.basePrice || 0) * (item.quantity || 0),
      0
    );
  }, [selectedItems]);

  const totalProductPrice = useMemo(() => {
    if (selectedItems.length === 0 && apiPriceInfo) {
      return apiPriceInfo.totalProductPrice;
    }
    return selectedTotalProductPrice;
  }, [selectedItems.length, selectedTotalProductPrice, apiPriceInfo]);

  const membershipDiscount = useMemo(() => {
    if (selectedItems.length === 0 && apiPriceInfo) {
      return apiPriceInfo.membershipDiscount;
    }
    return Math.floor(selectedTotalProductPrice * 0.1);
  }, [selectedItems.length, selectedTotalProductPrice, apiPriceInfo]);

  const shippingFee = useMemo(() => {
    return apiPriceInfo?.shippingFee || 0;
  }, [apiPriceInfo]);

  const totalPayment = useMemo(() => {
    if (selectedItems.length === 0 && apiPriceInfo) {
      return apiPriceInfo.totalPaymentPrice;
    }
    return totalProductPrice - membershipDiscount + shippingFee;
  }, [
    selectedItems.length,
    totalProductPrice,
    membershipDiscount,
    shippingFee,
    apiPriceInfo,
  ]);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        const newSelectedIds = new Set(
          selectableItems.map((item) => String(item.cartItemId))
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
          const itemId = String(item.cartItemId);
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

  const handleQuantityChange = useCallback(
    (_itemId: string, _quantity: number) => {
      // TODO: PUT api call to update quantity
      // API 호출 후 queryClient.invalidateQueries로 데이터 갱신
    },
    []
  );

  const handleDeleteItem = useCallback((_itemId: string) => {
    // TODO: DELETE api call
  }, []);

  const handleDeleteSelected = useCallback(() => {
    // TODO: DELETE api call for selected items
  }, []);

  const hasSelectedItems = selectedItems.length > 0;
  const isEmpty = cartData.length === 0;

  return {
    cartData,
    isPending,
    isEmpty,
    selectedItemIds,
    selectedItems,
    allItems,
    selectableItems,
    isAllSelected,
    hasSelectedItems,
    totalProductPrice,
    membershipDiscount,
    shippingFee,
    totalPayment,
    handleSelectAll,
    handleItemSelectChange,
    handleBrandSelectChange,
    handleQuantityChange,
    handleDeleteItem,
    handleDeleteSelected,
  };
}
