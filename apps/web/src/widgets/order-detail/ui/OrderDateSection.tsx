import * as styles from '@/widgets/order-detail/styles/OrderDateSection.css';

import type { OrderStatus } from '@/entities/CommerceOrder/model';
import { ORDER_STATUS_MAP } from '@/entities/CommerceOrder/model/orderConstants';


interface OrderDateSectionProps {
  orderDate: string;
  orderDayOfWeek: string;
  orderNumber: string;
  orderStatus: OrderStatus;
}

export function OrderDateSection({
  orderDate,
  orderDayOfWeek,
  orderNumber,
  orderStatus,
}: OrderDateSectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.dateColumn}>
        <h2 className={styles.date}>
          {orderDate}({orderDayOfWeek})
        </h2>
        <p className={styles.orderNumber}>주문번호 {orderNumber}</p>
      </div>
      <p className={styles.orderStatus}>{ORDER_STATUS_MAP[orderStatus]}</p>
    </div>
  );
}
