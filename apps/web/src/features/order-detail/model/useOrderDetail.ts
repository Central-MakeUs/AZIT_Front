import { useActivityParams } from '@stackflow/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

import { KAKAO_INQUIRY_CHAT_URL } from '@/shared/constants/url';
import { formatOrderDate } from '@/shared/lib/formatters';
import { openExternalUrl } from '@/shared/lib/openExternalUrl';
import { orderQueries } from '@/shared/queries/order';

export interface UseOrderDetailOptions {
  onCancelSuccess?: () => void;
}

export function useOrderDetail(options: UseOrderDetailOptions = {}) {
  const { onCancelSuccess } = options;
  const { id: orderNumber } = useActivityParams<{ id?: string }>();
  const queryClient = useQueryClient();

  const cancelOrderMutation = useMutation({
    ...orderQueries.cancelOrderMutation(orderNumber ?? ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all });
      onCancelSuccess?.();
    },
  });

  const { data, isPending, isError } = useQuery({
    ...orderQueries.getOrderDetailQuery(orderNumber ?? ''),
    enabled: !!orderNumber,
  });

  const result = useMemo(() => {
    if (!data?.ok || !data.data?.result) return null;
    return data.data.result;
  }, [data]);

  const { orderDate, orderDayOfWeek } = useMemo(
    () => formatOrderDate(result?.orderDate),
    [result?.orderDate]
  );

  const handleCheckDelivery = () => {
    // TODO: 택배사 확인 로직
  };

  const handleCancelOrder = () => {
    cancelOrderMutation.mutate();
  };

  const handleInquiry = () => {
    openExternalUrl(KAKAO_INQUIRY_CHAT_URL);
  };

  const handleCopyTrackingNumber = () => {
    const trackingNumber = result?.shippingInfo?.trackingNumber;
    if (trackingNumber) {
      navigator.clipboard.writeText(trackingNumber);
    }
  };

  return {
    orderNumber,
    result,
    isPending,
    isError,
    orderDate,
    orderDayOfWeek,
    cancelOrderMutation,
    handlers: {
      handleCheckDelivery,
      handleCancelOrder,
      handleInquiry,
      handleCopyTrackingNumber,
    },
  };
}
