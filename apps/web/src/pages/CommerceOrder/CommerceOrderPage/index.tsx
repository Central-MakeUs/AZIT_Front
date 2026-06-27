import { Button } from '@azit/design-system/button';
import { Divider } from '@azit/design-system/divider';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { useFlow } from '@/app/routes/stackflow';

import { OrderProductListSection } from '@/widgets/order-product-list/ui';

import { useOrder } from '@/features/CommerceOrder/model/useOrder';
import {
  OrderAddressSection,
  OrderDiscountSection,
  OrderPaymentDescription,
  OrderPaymentMethodSection,
  OrderSummarySection,
} from '@/features/CommerceOrder/ui';

import { footerWrapper } from '@/shared/styles/footer.css';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

import * as styles from './index.css';

import { DEFAULT_PAYMENT_METHOD } from '@/entities/CommerceOrder/model/orderConstants';

export function CommerceOrderPage() {
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
      replace('CommerceOrderCompletePage', { orderResult }),
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

  if (!result) return null;

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
