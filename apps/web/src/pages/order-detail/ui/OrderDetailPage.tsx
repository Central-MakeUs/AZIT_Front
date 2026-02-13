import { useMemo } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header } from '@azit/design-system/header';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import {
  OrderDateSection,
  OrderDeliveryAddressSection,
  OrderDeliveryInfoSection,
} from '@/features/order-detail/ui';
import { DepositInfoSection } from '@/features/order-complete/ui/DepositInfoSection';
import { PaymentInfoSection } from '@/widgets/order-payment-info/ui';
import { OrderProductListSection } from '@/widgets/order-product-list/ui';
import { orderQueries } from '@/shared/queries/order';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActivityParams } from '@stackflow/react';
import { useFlow } from '@/app/routes/stackflow';
import { KAKAO_INQUIRY_CHAT_URL } from '@/shared/constants/url';
import * as styles from '../styles/OrderDetailPage.css';
import { Divider } from '@azit/design-system/divider';
import { Button } from '@azit/design-system/button';
import type { OrderStatus } from '@/features/order-detail/api/types';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function formatOrderDate(dateString: string | undefined) {
  if (!dateString) return { orderDate: '', orderDayOfWeek: '' };
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const orderDate = `${year}.${month}.${day}`;
    const orderDayOfWeek = WEEKDAYS[date.getDay()];
    return { orderDate, orderDayOfWeek };
  } catch {
    return { orderDate: dateString, orderDayOfWeek: '' };
  }
}

export function OrderDetailPage() {
  const { id: orderNumber } = useActivityParams<{ id?: string }>();
  const { replace } = useFlow();
  const queryClient = useQueryClient();

  const cancelOrderMutation = useMutation({
    ...orderQueries.cancelOrderMutation(orderNumber ?? ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueries.all });
      replace('OrderHistory', {});
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
    window.open(KAKAO_INQUIRY_CHAT_URL, '_blank');
  };

  const handleCopyTrackingNumber = () => {
    const trackingNumber = result?.shippingInfo?.trackingNumber;
    if (trackingNumber) {
      navigator.clipboard.writeText(trackingNumber);
    }
  };

  if (!orderNumber) {
    return (
      <AppScreen>
        <AppLayout>
          <Header left={<BackButton />} center="주문 상세" />
          <div className={styles.mainContainer}>
            주문 정보를 찾을 수 없습니다.
          </div>
        </AppLayout>
      </AppScreen>
    );
  }

  if (isPending) {
    return (
      <AppScreen>
        <AppLayout>
          <Header left={<BackButton />} center="주문 상세" />
          <div className={styles.mainContainer}>로딩 중...</div>
        </AppLayout>
      </AppScreen>
    );
  }

  if (isError || !result) {
    return (
      <AppScreen>
        <AppLayout>
          <Header left={<BackButton />} center="주문 상세" />
          <div className={styles.mainContainer}>
            주문 정보를 불러올 수 없습니다.
          </div>
        </AppLayout>
      </AppScreen>
    );
  }

  const deliveryInfo = result.deliveryInfo;
  const shippingInfo = result.shippingInfo;
  const depositAccountInfo = result.depositAccountInfo;
  const items = result.items ?? [];
  const summary = result.summary;

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header left={<BackButton />} center="주문 상세" />
        </div>
        <div className={styles.mainContainer}>
          <OrderDateSection
            orderDate={orderDate}
            orderDayOfWeek={orderDayOfWeek}
            orderNumber={result.orderNumber ?? orderNumber}
            orderStatus={result.status as OrderStatus}
          />
          <Divider />
          {deliveryInfo && (
            <>
              <OrderDeliveryAddressSection deliveryInfo={deliveryInfo} />
              <Divider />
            </>
          )}
          {depositAccountInfo && (
            <>
              <DepositInfoSection
                {...depositAccountInfo}
                depositorName={depositAccountInfo.depositorName ?? ''}
              />
              <Divider />
            </>
          )}
          <OrderDeliveryInfoSection
            deliveryCompany={shippingInfo?.courier ?? '배송 준비 중'}
            trackingNumber={shippingInfo?.trackingNumber ?? '-'}
            onCheckDelivery={handleCheckDelivery}
            onCopyTrackingNumber={handleCopyTrackingNumber}
          />
          <Divider />
          <OrderProductListSection products={items} showOriginalPrice={false} />
          {summary && (
            <PaymentInfoSection
              totalProductPrice={summary.totalProductPrice ?? 0}
              membershipDiscount={summary.membershipDiscount ?? 0}
              pointDiscount={summary.pointDiscount ?? 0}
              shippingFee={summary.shippingFee ?? 0}
              totalPayment={summary.totalPaymentPrice ?? 0}
            />
          )}
          <div className={styles.buttonContainer}>
            <Button
              state="outline"
              onClick={handleCancelOrder}
              disabled={cancelOrderMutation.isPending}
            >
              {cancelOrderMutation.isPending ? '취소 처리 중...' : '주문 취소'}
            </Button>
            <Button state="outline" onClick={handleInquiry}>
              1:1 문의하기
            </Button>
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
