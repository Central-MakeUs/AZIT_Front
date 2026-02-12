import { useState } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import {
  OrderAddressSection,
  OrderPaymentDescription,
  OrderPaymentMethodSection,
  OrderSummarySection,
} from '@/features/order/ui';
import { OrderProductListSection } from '@/widgets/order-product-list/ui';
import { useOrderStore } from '@/shared/store/order';

import * as styles from '../styles/OrderPage.css';
import { useFlow } from '@/app/routes/stackflow';
import { footerWrapper } from '@/shared/styles/footer.css';
import { Divider } from '@azit/design-system/divider';
import { orderQueries } from '@/shared/api/queries/order';
import { useQuery } from '@tanstack/react-query';
import { DEFAULT_PAYMENT_METHOD } from '@/shared/constants/order';

export function OrderPage() {
  const { pop, push, replace } = useFlow();
  const { order, isDirectOrder } = useOrderStore();

  const [selectedPaymentCode, setSelectedPaymentCode] = useState<
    string | undefined
  >();
  const [deliveryMessage, setDeliveryMessage] = useState<string | undefined>();

  const handlePaymentSelect = (method: { code?: string }) => {
    setSelectedPaymentCode(method.code);
  };

  const { data: checkoutInfoDirect, isPending: isDirectPending } = useQuery({
    ...orderQueries.checkoutDirectQuery({
      skuId: order?.skuId ?? 0,
      quantity: order?.quantity ?? 0,
    }),
    enabled: isDirectOrder && !!order?.skuId && (order?.quantity ?? 0) > 0,
  });

  const { data: checkoutInfoCart, isPending: isCartPending } = useQuery({
    ...orderQueries.checkoutCartQuery({
      cartItemIds: order?.cartItemIds ?? [],
    }),
    enabled: !isDirectOrder && (order?.cartItemIds?.length ?? 0) > 0,
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

  const handlePayment = () => {
    // TODO: 결제 API 호출 (order store 데이터 사용)
    replace('OrderCompletePage', {});
  };

  const handleChangeAddress = () => {
    push('AddressSettingPage', {});
  };

  const handleBack = () => {
    pop();
  };

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
          <OrderPaymentMethodSection
            paymentMethods={result.paymentMethods ?? [DEFAULT_PAYMENT_METHOD]}
            selectedPaymentCode={selectedPaymentCode}
            onSelect={handlePaymentSelect}
          />
          {selectedPaymentCode && result.depositAccountInfo && (
            <OrderPaymentDescription {...result.depositAccountInfo} />
          )}
          <Divider />
          <OrderSummarySection
            totalProductPrice={totalProductPrice}
            membershipDiscount={membershipDiscount}
            pointsDiscount={0}
            shippingFee={shippingFee}
            totalPayment={totalPayment}
          />
        </div>
        <div className={footerWrapper}>
          <Button
            className={styles.ctaButton}
            state={selectedPaymentCode ? 'active' : 'disabled'}
            disabled={!selectedPaymentCode}
            onClick={handlePayment}
          >
            {totalPayment.toLocaleString()}원 결제하기
          </Button>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
