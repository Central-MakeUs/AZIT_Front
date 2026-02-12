import type { CartProductItem } from '../api/types';

type CartProductsResponse = Awaited<
  ReturnType<
    typeof import('@/features/cart/api/getCartProducts').getCartProducts
  >
>;

interface UseCartPriceParams {
  selectedItems: CartProductItem[];
  cartProductsResponse: CartProductsResponse | undefined;
}

export function useCartPrice({
  selectedItems,
  cartProductsResponse,
}: UseCartPriceParams) {
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

  // 배송비는 선택된 상품의 개수가 0개일 때 0, 아니면 카트 응답의 배송비
  // 배송비가 서버에서 전체 상품 기준으로만 응답이 와서 이 부분 개선 필요 (선택된 상품 기준으로 배송비 응답 추가 필요)
  const shippingFee =
    selectedItems.length === 0
      ? 0
      : cartProductsResponse?.ok && cartProductsResponse.data.result
        ? (cartProductsResponse.data.result.shippingFee ?? 0)
        : 0;

  // 총 결제 금액은 선택된 상품의 판매 가격 + 배송비
  const totalPayment = selectedTotalSalePrice + shippingFee;

  return {
    totalProductPrice,
    membershipDiscount,
    shippingFee,
    totalPayment,
  };
}
