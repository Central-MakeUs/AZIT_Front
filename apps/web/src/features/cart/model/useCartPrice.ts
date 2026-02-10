import { useMemo } from 'react';
import type { CartProductItem } from '@/shared/api/models';

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

  return {
    totalProductPrice,
    membershipDiscount,
    shippingFee,
    totalPayment,
  };
}
