import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header } from '@azit/design-system/header';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import {
  OrderDateSection,
  OrderDeliveryAddressSection,
  OrderDeliveryInfoSection,
} from '@/features/order-detail/ui';
import { PaymentInfoSection } from '@/widgets/order-payment-info/ui';
import { OrderProductListSection } from '@/widgets/order-product-list/ui';
import { mockOrderDetail } from '@/shared/mock/order';
import * as styles from '../styles/OrderDetailPage.css';

export function OrderDetailPage() {
  const handleCheckDelivery = () => {
    // TODO: 택배사 확인 로직
  };

  const handleCopyTrackingNumber = () => {
    navigator.clipboard.writeText(mockOrderDetail.trackingNumber);
    // TODO: 복사 완료 토스트 표시
  };

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header left={<BackButton />} center="주문 상세" />
        </div>
        <div className={styles.mainContainer}>
          <OrderDateSection
            orderDate={mockOrderDetail.orderDate}
            orderDayOfWeek={mockOrderDetail.orderDayOfWeek}
            orderNumber={mockOrderDetail.orderNumber}
          />
          <OrderDeliveryAddressSection
            address={mockOrderDetail.deliveryAddress}
            deliveryMessage={mockOrderDetail.deliveryMessage}
          />
          <OrderDeliveryInfoSection
            deliveryCompany={mockOrderDetail.deliveryCompany}
            trackingNumber={mockOrderDetail.trackingNumber}
            onCheckDelivery={handleCheckDelivery}
            onCopyTrackingNumber={handleCopyTrackingNumber}
          />
          <OrderProductListSection
            products={mockOrderDetail.products}
            showOriginalPrice={false}
          />
          <PaymentInfoSection
            totalProductPrice={mockOrderDetail.totalProductPrice}
            membershipDiscount={mockOrderDetail.membershipDiscount}
            pointDiscount={mockOrderDetail.pointsDiscount}
            shippingFee={mockOrderDetail.shippingFee}
            totalPayment={mockOrderDetail.totalPayment}
          />
        </div>
      </AppLayout>
    </AppScreen>
  );
}
