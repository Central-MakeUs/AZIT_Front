import { Button } from '@azit/design-system/button';
import { Divider } from '@azit/design-system/divider';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/order/styles/OrderPage.css';

import { OrderProductListSection } from '@/widgets/order-product-list/ui';

import { useOrder } from '@/features/order/model/useOrder';
import {
  OrderAddressSection,
  OrderDiscountSection,
  OrderPaymentDescription,
  OrderPaymentMethodSection,
  OrderSummarySection,
} from '@/features/order/ui';

import { DEFAULT_PAYMENT_METHOD } from '@/shared/constants/order';
import { footerWrapper } from '@/shared/styles/footer.css';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

export function OrderPage() {
  const { pop, push, replace } = useFlow();
  const {
    result,
    isPending,
    products,
    totalProductPrice,
    membershipDiscount,
    shippingFee,
    totalPayment,
    selectedPaymentCode,
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
  } = useOrder({
    onBack: () => pop(),
    onChangeAddress: () => push('AddressSettingPage', {}),
    onOrderSuccess: (orderResult) =>
      replace('OrderCompletePage', { orderResult }),
  });

  if (isPending) {
    return (
      <AppScreen>
        <AppLayout>
          <div className={styles.headerWrapper}>
            <Header
              left={<BackButton onClick={handleBack} />}
              center="주문하기"
            />
          </div>
          <div className={styles.mainContainer}>로딩 중...</div>
        </AppLayout>
      </AppScreen>
    );
  }

  if (!result) {
    return (
      <AppScreen>
        <AppLayout>
          <div className={styles.headerWrapper}>
            <Header
              left={<BackButton onClick={handleBack} />}
              center="주문하기"
            />
          </div>
          <div className={styles.mainContainer}>
            주문 정보를 불러올 수 없습니다.
          </div>
        </AppLayout>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header
            left={<BackButton onClick={handleBack} />}
            center="주문하기"
          />
        </div>
        <div className={styles.mainContainer}>
          <OrderAddressSection
            onChangeAddress={handleChangeAddress}
            address={result.deliveryInfo ?? null}
            deliveryMessage={deliveryMessage}
            onChangeDeliveryMessage={setDeliveryMessage}
          />
          <Divider />
          <OrderProductListSection
            products={products}
            title={`주문 상품 총 ${products.length}개`}
            showDivider={false}
          />
          <Divider />
          <OrderDiscountSection
            availablePoints={result.pointInfo?.availablePoints ?? 0}
            usedPoints={usedPoints}
            onPointsChange={setUsedPoints}
          />
          <Divider />
          <OrderPaymentMethodSection
            paymentMethods={result.paymentMethods ?? [DEFAULT_PAYMENT_METHOD]}
            selectedPaymentCode={selectedPaymentCode}
            onSelect={handlePaymentSelect}
          />
          {selectedPaymentCode && result.depositAccountInfo && (
            <OrderPaymentDescription
              {...result.depositAccountInfo}
              depositorName={depositorName}
              onDepositorNameChange={setDepositorName}
            />
          )}
          <Divider />
          <OrderSummarySection
            totalProductPrice={totalProductPrice}
            membershipDiscount={membershipDiscount}
            pointsDiscount={usedPoints}
            shippingFee={shippingFee}
            totalPayment={totalPayment - usedPoints}
          />
        </div>
        <div className={footerWrapper}>
          <Button
            className={styles.ctaButton}
            state={
              selectedPaymentCode && !createOrderMutation.isPending
                ? 'active'
                : 'disabled'
            }
            disabled={!selectedPaymentCode || createOrderMutation.isPending}
            onClick={handlePayment}
          >
            {createOrderMutation.isPending
              ? '결제 중...'
              : `${(totalPayment - usedPoints).toLocaleString()}원 결제하기`}
          </Button>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
