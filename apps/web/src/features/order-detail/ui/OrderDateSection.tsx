import * as styles from '../styles/OrderDateSection.css';

interface OrderDateSectionProps {
  orderDate: string;
  orderDayOfWeek: string;
  orderNumber: string;
}

export function OrderDateSection({
  orderDate,
  orderDayOfWeek,
  orderNumber,
}: OrderDateSectionProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.date}>
        {orderDate}({orderDayOfWeek})
      </h2>
      <p className={styles.orderNumber}>주문번호 #{orderNumber}</p>
      <div className={styles.divider} />
    </div>
  );
}
