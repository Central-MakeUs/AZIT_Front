import { useMemo } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import {
  OrderAddressSection,
  OrderDiscountSection,
  OrderPaymentMethodSection,
  OrderSummarySection,
} from '@/features/order/ui';
import { OrderProductListSection } from '@/widgets/order-product-list/ui';
import {
  mockOrderProducts,
  mockOrderAddress,
  mockPaymentMethod,
  mockAvailablePoints,
} from '@/shared/mock/order';
import * as styles from '../styles/OrderPage.css';
import { useFlow } from '@/app/routes/stackflow';
import { footerWrapper } from '@/shared/styles/footer.css';

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
        <div className={styles.headerWrapper}>
          <Header
            left={<BackButton onClick={handleBack} />}
            center="장바구니"
          />
        </div>
        <div className={styles.mainContainer}>
          <OrderAddressSection
            address={mockOrderAddress}
            onChangeAddress={handleChangeAddress}
          />
          <div className={styles.divider} />
          <OrderProductListSection
            products={mockOrderProducts}
            title={`주문 상품 총 ${mockOrderProducts.length}개`}
            showDivider={false}
          />
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
        <div className={footerWrapper}>
          <Button
            className={styles.ctaButton}
            state="active"
            onClick={handlePayment}
          >
            {totalPayment.toLocaleString()}원 결제하기
          </Button>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
