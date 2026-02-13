import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { useAddToCart } from '@/features/cart/model/useCartAction';

import type { KakaoShareOptions } from '@/shared/lib/useKakaoShare';
import { storeQueries } from '@/shared/queries';

export interface UseStoreDetailOptions {
  productId: string;
  shareWithKakao: (options: KakaoShareOptions) => void;
  onPurchase: (params: { skuId: number; quantity: number }) => void;
}

export function useStoreDetail({
  productId,
  shareWithKakao,
  onPurchase,
}: UseStoreDetailOptions) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [selectedOptionId, setSelectedOptionId] = useState<number | undefined>(
    undefined
  );
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isPending,
    isError,
  } = useQuery(storeQueries.productDetailQuery(productId));

  const { handleAddItem, isPending: isAddToCartPending } = useAddToCart();

  const options =
    product?.optionGroups?.[0]?.values?.map((optionValue) => ({
      label: optionValue.value || '',
      value: String(optionValue.id || ''),
    })) ?? [];

  const selectedSku = product?.skus?.find((sku) =>
    sku.optionValueIds?.includes(selectedOptionId ?? -1)
  );

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
    const selectedOptionValue = options.find((opt) => opt.value === optionId);
    setSelectedOption(selectedOptionValue?.label);
    setSelectedOptionId(Number(optionId));
    setQuantity(1);
  }

  function closeBottomSheetAndResetOption() {
    setIsBottomSheetOpen(false);
    setSelectedOption(undefined);
    setSelectedOptionId(undefined);
    setQuantity(1);
  }

  function handlePurchaseClick() {
    if (!selectedSku?.id) return;
    closeBottomSheetAndResetOption();
    onPurchase({ skuId: selectedSku.id, quantity });
  }

  function handleAddToCart() {
    if (!product?.id || !selectedSku?.id) return;
    handleAddItem(
      {
        productId: product.id,
        productSkuId: selectedSku.id,
        quantity,
      },
      {
        onSuccess: closeBottomSheetAndResetOption,
        onError: (error) => {
          console.error('장바구니 추가 실패:', error);
          // TODO: 에러 처리 (토스트 메시지 등)
        },
      }
    );
  }

  return {
    product,
    isPending,
    isError,
    isBottomSheetOpen,
    selectedOption,
    selectedOptionId,
    quantity,
    setQuantity,
    options,
    selectedSku,
    isAddToCartPending,
    handleShare,
    handleOptionSelectClick,
    handleOptionSelect,
    handleAddToCart,
    handlePurchaseClick,
    closeBottomSheetAndResetOption,
  };
}
