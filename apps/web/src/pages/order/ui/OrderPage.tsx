import { useMemo } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Button, Header } from '@azit/design-system';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import {
  OrderProductList,
  OrderAddressSection,
  OrderDiscountSection,
  OrderPaymentMethodSection,
  OrderSummarySection,
} from '@/features/order/ui';
import {
  mockOrderProducts,
  mockOrderAddress,
  mockPaymentMethod,
  mockAvailablePoints,
} from '@/shared/mock/order';
import * as styles from '../styles/OrderPage.css';
import { useFlow } from '@/app/routes/stackflow';

const MEMBERSHIP_DISCOUNT_RATE = 0.1;

export function OrderPage() {
  const { pop, replace } = useFlow();

  const totalProductPrice = useMemo(() => {
    return mockOrderProducts.reduce(
      (sum, product) => sum + product.originalPrice * product.quantity,
      0
    );
  }, []);

  const membershipDiscount = useMemo(() => {
    return Math.floor(totalProductPrice * MEMBERSHIP_DISCOUNT_RATE);
  }, [totalProductPrice]);

  const pointsDiscount = 0;
  const shippingFee = 0;

  const totalPayment = useMemo(() => {
    return (
      totalProductPrice - membershipDiscount - pointsDiscount + shippingFee
    );
  }, [totalProductPrice, membershipDiscount, pointsDiscount, shippingFee]);

  const handleChangeAddress = () => {
    // TODO: 배송지 변경 로직
  };

  const handlePayment = () => {
    // TODO: 결제 로직
    replace('OrderCompletePage', {});
  };

  const handleBack = () => {
    pop();
  };

  return (
    <AppScreen>
      <AppLayout>
        <Header
          sticky
          left={<BackButton onClick={handleBack} />}
          center="장바구니"
        />
        <div className={styles.pageContainer}>
          <div className={styles.contentWrapper}>
            <OrderAddressSection
              address={mockOrderAddress}
              onChangeAddress={handleChangeAddress}
            />
            <div className={styles.divider} />
            <OrderProductList products={mockOrderProducts} />
            <div className={styles.divider} />
            <OrderDiscountSection availablePoints={mockAvailablePoints} />
            <div className={styles.divider} />
            <OrderPaymentMethodSection paymentMethod={mockPaymentMethod} />
            <div className={styles.divider} />
            <OrderSummarySection
              totalProductPrice={totalProductPrice}
              membershipDiscount={membershipDiscount}
              pointsDiscount={pointsDiscount}
              shippingFee={shippingFee}
              totalPayment={totalPayment}
            />
          </div>
          <div className={styles.footerWrapper}>
            <Button
              className={styles.ctaButton}
              state="active"
              onClick={handlePayment}
            >
              {totalPayment.toLocaleString()}원 결제하기
            </Button>
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
