import { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cartQueries } from '@/shared/api/queries/cart';
import type { CartBrand } from '@/shared/mock/cart';
import type { CartProductItem } from '@/shared/api/models';

interface CartItem {
  id: string;
  brandId: string;
  name: string;
  size: string;
  expectedDelivery: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  isSoldOut: boolean;
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

const transformCartData = (items: CartProductItem[]): CartBrand[] => {
  const brandMap = new Map<string, { name: string; items: CartItem[] }>();

  items.forEach((item) => {
    const brandName = item.brandName || '기타';
    const brandId = brandName.toLowerCase().replace(/\s+/g, '-');

    if (!brandMap.has(brandId)) {
      brandMap.set(brandId, { name: brandName, items: [] });
    }

    const cartItem: CartItem = {
      id: String(item.cartItemId),
      brandId,
      name: item.productName || '',
      size: item.optionDescription || '',
      expectedDelivery: item.expectedShippingDate
        ? formatExpectedDelivery(item.expectedShippingDate)
        : '',
      originalPrice: item.basePrice || 0,
      discountedPrice: item.salePrice || 0,
      quantity: item.quantity || 0,
      isSoldOut: (item.quantity || 0) === 0,
    };

    brandMap.get(brandId)!.items.push(cartItem);
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
    return allItems.filter((item) => !item.isSoldOut);
  }, [allItems]);

  const selectedItems = useMemo(() => {
    return selectableItems.filter((item) => selectedItemIds.has(item.id));
  }, [selectableItems, selectedItemIds]);

  const isAllSelected = useMemo(() => {
    return (
      selectableItems.length > 0 &&
      selectedItems.length === selectableItems.length
    );
  }, [selectableItems, selectedItems]);

  const selectedTotalProductPrice = useMemo(() => {
    return selectedItems.reduce(
      (sum, item) => sum + item.originalPrice * item.quantity,
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
        const newSelectedIds = new Set(selectableItems.map((item) => item.id));
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
        (item) => !item.isSoldOut
      );

      setSelectedItemIds((prev) => {
        const newSet = new Set(prev);
        selectableItemsInBrand.forEach((item) => {
          if (checked) {
            newSet.add(item.id);
          } else {
            newSet.delete(item.id);
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
