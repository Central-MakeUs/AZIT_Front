import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Button, Header, ChevronLeftIcon, HomeIcon } from '@azit/design-system';
import { AppLayout } from '@/shared/ui/layout';
import {
  OrderCompleteHeader,
  DeliveryInfoSection,
  PaymentInfoSection,
} from '@/features/order-complete/ui';
import { mockOrderCompleteData } from '@/shared/mock/order-complete';
import * as styles from '../styles/OrderCompletePage.css';
import { useFlow } from '@/app/routes/stackflow';

export function OrderCompletePage() {
  const { replace } = useFlow();

  const handleViewDetail = () => {
    // TODO: 주문 상세보기 네비게이션
    console.log('주문 상세보기');
  };

  const handleContinueShopping = () => {
    // TODO: 홈으로 네비게이션
    console.log('쇼핑 계속하기');
  };

  const handleBack = () => {
    // TODO: 뒤로가기
    console.log('뒤로가기');
  };

  const handleHome = () => {
    // TODO: 홈으로
    console.log('홈으로');
    replace('HomePage', {});
  };

  return (
    <AppScreen>
      <AppLayout>
        <Header
          sticky
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
        <div className={styles.pageContainer}>
          <div className={styles.headerSection}>
            <OrderCompleteHeader
              orderNumber={mockOrderCompleteData.orderNumber}
              onViewDetail={handleViewDetail}
            />
          </div>
          <div className={styles.infoSection}>
            <DeliveryInfoSection
              name={mockOrderCompleteData.deliveryInfo.name}
              phone={mockOrderCompleteData.deliveryInfo.phone}
              address={mockOrderCompleteData.deliveryInfo.address}
            />
            <PaymentInfoSection
              totalProductPrice={
                mockOrderCompleteData.payment.totalProductPrice
              }
              membershipDiscount={
                mockOrderCompleteData.payment.membershipDiscount
              }
              pointDiscount={mockOrderCompleteData.payment.pointDiscount}
              shippingFee={mockOrderCompleteData.payment.shippingFee}
              totalPayment={mockOrderCompleteData.payment.totalPayment}
            />
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
