import { useActivityParams } from '@stackflow/react';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useMemo } from 'react';

import { BusinessError } from '@/shared/api/apiHandler';
import { KAKAO_INQUIRY_CHAT_URL } from '@/shared/constants/url';
import { copyToClipboard } from '@/shared/lib/clipboard';
import { formatOrderDate } from '@/shared/lib/formatters';
import { openExternalUrl } from '@/shared/lib/openExternalUrl';
import { orderQueries } from '@/shared/queries/order';
import { toastError, toastSuccess } from '@/shared/ui/toast';

export interface UseOrderDetailOptions {
  onCancelSuccess?: () => void;
}

export function useOrderDetail(options: UseOrderDetailOptions = {}) {
  const { onCancelSuccess } = options;
  const { id: orderNumber } = useActivityParams<{ id: string }>();
  const queryClient = useQueryClient();

  const cancelOrderMutation = useMutation({
    ...orderQueries.cancelOrderMutation(orderNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all });
      toastSuccess('주문 취소가 완료되었습니다.');
      onCancelSuccess?.();
    },
    onError: (error) => {
      if (error instanceof BusinessError) {
        toastError(error.message);
      } else {
        toastError('주문 취소에 실패했습니다.');
      }
    },
  });

  const { data } = useSuspenseQuery(
    orderQueries.getOrderDetailQuery(orderNumber)
  );

  const result = useMemo(() => data.result, [data]);

  const { orderDate, orderDayOfWeek } = useMemo(
    () => formatOrderDate(result.orderDate),
    [result.orderDate]
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
    const trackingNumber = result.shippingInfo?.trackingNumber;
    if (trackingNumber) {
      copyToClipboard(trackingNumber, '송장번호');
    }
  };

  return {
    orderNumber,
    result,
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
