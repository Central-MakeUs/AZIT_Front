import { Button } from '@azit/design-system/button';
import { Divider } from '@azit/design-system/divider';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/order/styles/OrderDetailPage.css.ts';

import { PaymentInfoSection } from '@/widgets/order-payment-info/ui';
import { OrderProductListSection } from '@/widgets/order-product-list/ui';

import { DepositInfoSection } from '@/features/order-complete/ui/DepositInfoSection';
import type { OrderStatus } from '@/features/order-detail/api/types';
import { useOrderDetail } from '@/features/order-detail/model/useOrderDetail';
import {
  OrderDateSection,
  OrderDeliveryAddressSection,
  OrderDeliveryInfoSection,
} from '@/features/order-detail/ui';

import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

export function OrderDetailPage() {
  const { replace } = useFlow();
  const {
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
  } = useOrderDetail({
    onCancelSuccess: () => replace('OrderHistory', {}),
  });

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
            deliveryStatus={result.status as OrderStatus}
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
