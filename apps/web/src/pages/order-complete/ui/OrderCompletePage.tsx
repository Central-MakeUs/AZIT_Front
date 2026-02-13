import { Button } from '@azit/design-system/button';
import { Divider } from '@azit/design-system/divider';
import { Header } from '@azit/design-system/header';
import { ChevronLeftIcon, HomeIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/order-complete/styles/OrderCompletePage.css';

import { PaymentInfoSection } from '@/widgets/order-payment-info/ui';

import type { CreateOrderResponse } from '@/features/order/api/types';
import {
  OrderCompleteHeader,
  DeliveryInfoSection,
} from '@/features/order-complete/ui';
import { DepositInfoSection } from '@/features/order-complete/ui/DepositInfoSection';

import { AppLayout } from '@/shared/ui/layout';

interface OrderCompletePageParams {
  orderResult?: CreateOrderResponse;
}

export function OrderCompletePage({
  params,
}: {
  params?: OrderCompletePageParams;
}) {
  const { replace } = useFlow();
  const orderResult = params?.orderResult;

  const handleViewDetail = () => {
    if (orderResult?.orderNumber) {
      replace('OrderDetailPage', {
        id: orderResult.orderNumber.replace('#', ''),
      });
    }
  };

  const handleContinueShopping = () => {
    replace('StorePage', {});
  };

  const handleBack = () => {
    replace('StorePage', {});
  };

  const handleHome = () => {
    replace('StorePage', {});
  };

  if (!orderResult) {
    return (
      <AppScreen>
        <AppLayout>
          <div className={styles.headerWrapper}>
            <Header
              left={
                <button onClick={handleBack} className={styles.iconButton}>
                  <ChevronLeftIcon size={24} />
                </button>
              }
              center="주문 완료"
              right={
                <button onClick={handleHome} className={styles.iconButton}>
                  <HomeIcon size={24} />
                </button>
              }
            />
          </div>
          <div className={styles.mainContainer}>
            주문 정보를 불러올 수 없습니다.
          </div>
        </AppLayout>
      </AppScreen>
    );
  }

  const { orderNumber, deliveryInfo, summary, depositAccountInfo } =
    orderResult;
  const address = deliveryInfo
    ? [deliveryInfo.baseAddress, deliveryInfo.detailAddress]
        .filter(Boolean)
        .join(' ')
    : '';

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header
            left={
              <button onClick={handleBack} className={styles.iconButton}>
                <ChevronLeftIcon size={24} />
              </button>
            }
            center="주문 완료"
            right={
              <button onClick={handleHome} className={styles.iconButton}>
                <HomeIcon size={24} />
              </button>
            }
          />
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.headerSection}>
            <OrderCompleteHeader
              orderNumber={orderNumber ?? ''}
              onViewDetail={handleViewDetail}
            />
          </div>
          <div className={styles.infoSection}>
            {deliveryInfo && (
              <DeliveryInfoSection
                name={deliveryInfo.recipientName ?? ''}
                phone={deliveryInfo.phoneNumber ?? ''}
                address={address}
              />
            )}
            <Divider />
            {depositAccountInfo && (
              <DepositInfoSection
                {...depositAccountInfo}
                depositorName={depositAccountInfo.depositorName ?? ''}
              />
            )}
            <Divider />
            {summary && (
              <PaymentInfoSection
                totalProductPrice={summary.totalProductPrice ?? 0}
                membershipDiscount={summary.membershipDiscount ?? 0}
                pointDiscount={summary.pointDiscount ?? 0}
                shippingFee={summary.shippingFee ?? 0}
                totalPayment={summary.totalPaymentPrice ?? 0}
              />
            )}
          </div>
          <div className={styles.footerWrapper}>
            <Button state="active" onClick={handleContinueShopping}>
              쇼핑 계속하기
            </Button>
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
