import { ORDER_STATUS_MAP } from '@/shared/constants/order';
import type { OrderStatus } from '../api/types';
import * as styles from '../styles/OrderDateSection.css';

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
