import type { CartProductItem } from '@/features/cart/api/types';

interface UseCartPriceParams {
  selectedItems: CartProductItem[];
}

export function useCartPrice({ selectedItems }: UseCartPriceParams) {
  // 선택된 상품의 총 상품 가격 (정가)
  const selectedTotalProductPrice = selectedItems.reduce(
    (sum, item) => sum + (item.basePrice || 0) * (item.quantity || 0),
    0
  );

  // 선택된 상품의 총 판매 가격 (할인가)
  const selectedTotalSalePrice = selectedItems.reduce(
    (sum, item) => sum + (item.salePrice || 0) * (item.quantity || 0),
    0
  );

  // 총 가격은 선택된 상품의 총 가격과 같음
  const totalProductPrice = selectedTotalProductPrice;

  // 총 할인된 가격은 선택된 상품의 총 가격 - 선택된 상품의 총 판매 가격
  const membershipDiscount = selectedTotalProductPrice - selectedTotalSalePrice;

  // 배송비는 브랜드별로 1회만 (같은 브랜드 상품은 배송비 중복 부과 방지)
  const shippingFee = (() => {
    const feeByBrand = new Map<number | string, number>();
    for (const item of selectedItems) {
      const key = item.brandId ?? item.brandName ?? '';
      if (key === '') continue;
      if (!feeByBrand.has(key)) {
        feeByBrand.set(key, item.shippingFee ?? 0);
      }
    }
    return [...feeByBrand.values()].reduce((a, b) => a + b, 0);
  })();

  // 총 결제 금액은 선택된 상품의 판매 가격 + 배송비
  const totalPayment = selectedTotalSalePrice + shippingFee;

  return {
    totalProductPrice,
    membershipDiscount,
    shippingFee,
    totalPayment,
  };
}
