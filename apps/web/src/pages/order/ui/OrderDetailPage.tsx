import { Button } from '@azit/design-system/button';
import { Divider } from '@azit/design-system/divider';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Suspense } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/order/styles/OrderDetailPage.css.ts';

import { DepositInfoSection } from '@/widgets/order-complete/ui';
import {
  OrderDateSection,
  OrderDeliveryAddressSection,
  OrderDeliveryInfoSection,
} from '@/widgets/order-detail/ui';
import { PaymentInfoSection } from '@/widgets/order-payment-info/ui';
import { OrderProductListSection } from '@/widgets/order-product-list/ui';

import { useOrderDetail } from '@/features/order/model/useOrderDetail';

import { BackButton } from '@/shared/ui/button';
import { BusinessErrorFallback, DomainErrorBoundary } from '@/shared/ui/error';
import { AppLayout } from '@/shared/ui/layout';
import { PageLoader } from '@/shared/ui/loading/PageLoader';

import type { OrderStatus } from '@/entities/order/model';

function OrderDetailContent() {
  const { replace } = useFlow();
  const {
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
  } = useOrderDetail({
    onCancelSuccess: () => replace('OrderHistory', {}),
  });

  const deliveryInfo = result.deliveryInfo;
  const shippingInfo = result.shippingInfo;
  const depositAccountInfo = result.depositAccountInfo;
  const items = result.items ?? [];
  const summary = result.summary;

  return (
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
  );
}

export function OrderDetailPage() {
  return (
    <AppScreen>
      <AppLayout>
        <DomainErrorBoundary
          fallback={({ error, reset }) => (
            <BusinessErrorFallback error={error} onReset={reset} />
          )}
        >
          <div className={styles.headerWrapper}>
            <Header left={<BackButton />} center="주문 상세" />
          </div>
          <Suspense fallback={<PageLoader />}>
            <OrderDetailContent />
          </Suspense>
        </DomainErrorBoundary>
      </AppLayout>
    </AppScreen>
  );
}
