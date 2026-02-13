import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { useAddToCart } from '@/features/cart/model/useCartAction';

import type { KakaoShareOptions } from '@/shared/lib/useKakaoShare';
import { storeQueries } from '@/shared/queries';

export interface SelectedDetailItem {
  id: string;
  optionId: number;
  optionLabel: string;
  skuId: number;
  quantity: number;
}

export interface UseStoreDetailOptions {
  productId: string;
  shareWithKakao: (options: KakaoShareOptions) => void;
  onPurchase: (params: { skuId: number; quantity: number }) => void;
  onPurchaseMultiple?: () => void;
}

let selectedItemIdCounter = 0;
function nextSelectedItemId() {
  selectedItemIdCounter += 1;
  return `item-${selectedItemIdCounter}`;
}

export function useStoreDetail({
  productId,
  shareWithKakao,
  onPurchase,
  onPurchaseMultiple,
}: UseStoreDetailOptions) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedDetailItem[]>([]);

  const {
    data: product,
    isPending,
    isError,
  } = useQuery(storeQueries.productDetailQuery(productId));

  const { addItemAsync, isPending: isAddToCartPending } = useAddToCart();

  const options =
    product?.optionGroups?.[0]?.values?.map((optionValue) => ({
      label: optionValue.value || '',
      value: String(optionValue.id || ''),
    })) ?? [];

  const totalQuantity = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalProductPrice = selectedItems.reduce(
    (sum, item) => sum + (product?.salePrice ?? 0) * item.quantity,
    0
  );
  const shippingFee =
    selectedItems.length > 0 ? (product?.shippingFee ?? 0) : 0;
  const expectedPayment = totalProductPrice + shippingFee;

  function handleShare() {
    if (!product) return;
    const imageUrl =
      product.slideImageUrls?.[0] ?? product.detailImageUrls?.[0] ?? '';
    shareWithKakao({
      title: `[AZIT 스토어] ${product.productName} 크루 전용 특가 도착!
오직 AZIT 크루에게만 제공되는 단독 최저가! 지금 바로 앱에서 확인하고 혜택을 누려보세요.`,
      imageUrl,
      url: window.location.href,
      productName: product.productName ?? '',
      regularPrice: product.basePrice ?? 0,
      discountRate: product.discountRate ?? 0,
      discountPrice: product.salePrice ?? 0,
    });
  }

  function handleOptionSelectClick() {
    setIsBottomSheetOpen(true);
  }

  function handleOptionSelect(optionId: string) {
    const optionIdNum = Number(optionId);
    const selectedOptionValue = options.find((opt) => opt.value === optionId);
    const sku = product?.skus?.find((s) =>
      s.optionValueIds?.includes(optionIdNum)
    );
    const skuId = sku?.id;
    if (!selectedOptionValue || skuId == null) return;
    setSelectedItems((prev) => {
      const sameOption = prev.find((item) => item.skuId === skuId);
      if (sameOption) {
        return prev.map((item) =>
          item.skuId === skuId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: nextSelectedItemId(),
          optionId: optionIdNum,
          optionLabel: selectedOptionValue.label,
          skuId,
          quantity: 1,
        },
      ];
    });
  }

  function closeBottomSheetAndResetOption() {
    setIsBottomSheetOpen(false);
    setSelectedItems([]);
  }

  function setItemQuantity(itemId: string, quantity: number) {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }

  function removeItem(itemId: string) {
    setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
  }

  async function handlePurchaseClick() {
    if (selectedItems.length === 0) return;
    if (selectedItems.length === 1) {
      const [one] = selectedItems;
      closeBottomSheetAndResetOption();
      onPurchase({ skuId: one.skuId, quantity: one.quantity });
      return;
    }
    if (!product?.id) return;
    const promises = selectedItems.map((item) =>
      addItemAsync({
        productId: product.id,
        productSkuId: item.skuId,
        quantity: item.quantity,
      })
    );
    try {
      await Promise.all(promises);
      closeBottomSheetAndResetOption();
      onPurchaseMultiple?.();
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
    }
  }

  async function handleAddToCart() {
    if (!product?.id || selectedItems.length === 0) return;
    const promises = selectedItems.map((item) =>
      addItemAsync({
        productId: product.id,
        productSkuId: item.skuId,
        quantity: item.quantity,
      })
    );
    try {
      await Promise.all(promises);
      closeBottomSheetAndResetOption();
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
    }
  }

  return {
    product,
    isPending,
    isError,
    isBottomSheetOpen,
    selectedItems,
    options,
    totalQuantity,
    totalProductPrice,
    shippingFee,
    expectedPayment,
    isAddToCartPending,
    handleShare,
    handleOptionSelectClick,
    handleOptionSelect,
    handleAddToCart,
    handlePurchaseClick,
    closeBottomSheetAndResetOption,
    setItemQuantity,
    removeItem,
  };
}
