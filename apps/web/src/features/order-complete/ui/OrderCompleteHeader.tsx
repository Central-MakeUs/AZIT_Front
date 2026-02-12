import { typography } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { CheckCircleBrokenIcon } from '@azit/design-system/icon';
import * as styles from '../styles/OrderCompleteHeader.css';

interface OrderCompleteHeaderProps {
  orderNumber: string;
  onViewDetail: () => void;
}

export function OrderCompleteHeader({
  orderNumber,
  onViewDetail,
}: OrderCompleteHeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <CheckCircleBrokenIcon size={64} color="primary" />
        <div className={styles.textWrapper}>
          <p className={styles.title}>주문이 완료되었어요</p>
          <div className={styles.orderNumber}>
            <span>주문 번호 :</span>
            <span className={styles.orderNumberValue}>{orderNumber}</span>
          </div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          state="outline"
          style={{
            height: '100%',
          }}
          className={typography.body.b2}
          onClick={onViewDetail}
        >
          주문 상세보기
        </Button>
      </div>
    </div>
  );
}
