import { useActivityParams } from '@stackflow/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { PAYMENT_METHOD_MAP } from '@/shared/constants/order';
import { parseOrderParams } from '@/shared/lib/orderParams';
import type { OrderPageParams } from '@/shared/lib/orderParams';
import { orderQueries } from '@/shared/queries/order';
import { toastError } from '@/shared/ui/toast';

import type { CreateOrderResponse } from '@/entities/order/model';

const BANK_TRANSFER_CODE = PAYMENT_METHOD_MAP.BANK_TRANSFER.code;

export interface UseOrderOptions {
  onBack?: () => void;
  onChangeAddress?: () => void;
  onOrderSuccess?: (result: CreateOrderResponse) => void;
}

export function useOrder(options: UseOrderOptions = {}) {
  const { onBack, onChangeAddress, onOrderSuccess } = options;
  const params = useActivityParams<OrderPageParams>();
  const { skuId, quantity, cartItemIds } = parseOrderParams(params);
  const isDirectOrder = skuId > 0;

  const [selectedPaymentCode, setSelectedPaymentCode] = useState<
    string | undefined
  >();
  const [deliveryMessage, setDeliveryMessage] = useState<string | undefined>();
  const [depositorName, setDepositorName] = useState('');
  const [usedPoints, setUsedPoints] = useState(0);

  const createOrderMutation = useMutation(orderQueries.createOrderMutation());

  const handlePaymentSelect = (method: { code?: string }) => {
    setSelectedPaymentCode(method.code);
  };

  const { data: checkoutInfoDirect, isPending: isDirectPending } = useQuery({
    ...orderQueries.checkoutDirectQuery({ skuId, quantity }),
    enabled: isDirectOrder && skuId > 0 && quantity > 0,
  });

  const { data: checkoutInfoCart, isPending: isCartPending } = useQuery({
    ...orderQueries.checkoutCartQuery({ cartItemIds }),
    enabled: !isDirectOrder && cartItemIds.length > 0,
  });

  const checkoutInfo = isDirectOrder ? checkoutInfoDirect : checkoutInfoCart;
  const isPending = isDirectOrder ? isDirectPending : isCartPending;

  const result =
    !checkoutInfo?.ok || !checkoutInfo.data?.result
      ? null
      : checkoutInfo.data.result;

  const products = result?.items ?? [];
  const summary = result?.summary;
  const totalProductPrice = summary?.totalProductPrice ?? 0;
  const membershipDiscount = summary?.membershipDiscount ?? 0;
  const shippingFee = summary?.shippingFee ?? 0;
  const totalPayment = totalProductPrice - membershipDiscount + shippingFee;

  const handlePayment = async () => {
    if (!result) return;
    const delivery = result.deliveryInfo;
    if (!delivery) {
      toastError('배송지를 선택해주세요');
      return;
    }
    if (selectedPaymentCode === BANK_TRANSFER_CODE && !depositorName.trim()) {
      toastError('입금자명을 입력해주세요');
      return;
    }

    const payload = {
      ...(isDirectOrder ? { skuId, quantity } : { cartItemIds }),
      recipientName: delivery.recipientName ?? '',
      phoneNumber: delivery.phoneNumber ?? '',
      baseAddress: delivery.baseAddress ?? '',
      detailAddress: delivery.detailAddress ?? '',
      ...(deliveryMessage && { shippingInstruction: deliveryMessage }),
      usedPoints,
      paymentMethod: selectedPaymentCode ?? '',
      ...(selectedPaymentCode === BANK_TRANSFER_CODE && {
        depositorName: depositorName.trim(),
      }),
    };

    try {
      const response = await createOrderMutation.mutateAsync(payload);
      if (response.ok && response.data?.result) {
        onOrderSuccess?.(response.data.result);
      }
      if (!response.ok) {
        toastError('주문에 실패했어요');
      }
    } catch {
      toastError('주문에 실패했어요');
    }
  };

  const handleChangeAddress = () => {
    onChangeAddress?.();
  };

  const handleBack = () => {
    onBack?.();
  };

  return {
    result,
    isPending,
    isDirectOrder,
    products,
    summary,
    totalProductPrice,
    membershipDiscount,
    shippingFee,
    totalPayment,
    selectedPaymentCode,
    setSelectedPaymentCode,
    deliveryMessage,
    setDeliveryMessage,
    depositorName,
    setDepositorName,
    createOrderMutation,
    usedPoints,
    setUsedPoints,
    handlers: {
      handlePaymentSelect,
      handlePayment,
      handleChangeAddress,
      handleBack,
    },
  };
}
