import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useCartAction } from '@/features/cart/model/useCartAction';
import { useCartPrice } from '@/features/cart/model/useCartPrice';
import { useCartSelect } from '@/features/cart/model/useCartSelect';

import { cartQueries } from '@/shared/queries/cart';

import type { CartProductItem, CartBrand } from '@/entities/cart/model';

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

/**
 * 1) product fetching + 훅 조합
 * 2) useCartSelect: 선택 상태 및 핸들러
 * 3) useCartAction: 아이템 추가 및 삭제 뮤테이션
 * 4) useCartPrice: product 기반 가격, 주문 요약 정보 계산
 */
export function useCart() {
  const { data: cartProductsResponse, isPending } = useQuery(
    cartQueries.productsQuery()
  );

  const cartData = useMemo(() => {
    if (!cartProductsResponse?.ok || !cartProductsResponse.data.result) {
      return [];
    }
    return transformCartData(cartProductsResponse.data.result);
  }, [cartProductsResponse]);

  const allItems = useMemo(() => {
    return cartData.flatMap((brand) => brand.items);
  }, [cartData]);

  const {
    selectedItemIds,
    setSelectedItemIds,
    selectableItems,
    selectedItems,
    isAllSelected,
    handleSelectAll,
    handleItemSelectChange,
    handleBrandSelectChange,
  } = useCartSelect({ allItems, cartData });

  const {
    handleAddItem,
    isAddToCartPending,
    handleQuantityChange,
    handleDeleteItem,
    handleDeleteSelected,
  } = useCartAction({
    selectedItemIds,
    setSelectedItemIds,
  });

  const { totalProductPrice, membershipDiscount, shippingFee, totalPayment } =
    useCartPrice({ selectedItems });

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
    handleAddItem,
    isAddToCartPending,
    handleSelectAll,
    handleItemSelectChange,
    handleBrandSelectChange,
    handleQuantityChange,
    handleDeleteItem,
    handleDeleteSelected,
  };
}
