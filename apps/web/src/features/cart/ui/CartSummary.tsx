import { Description } from '@azit/design-system/description';
import { Divider } from '@azit/design-system/divider';

import { formatPrice } from '@/shared/lib/formatters';

import { useCartContext } from '../context/CartContext';
import * as styles from '../styles/CartSummary.css';

function formatDiscount(price: number): string {
  if (price === 0) return '0원';
  return `-${formatPrice(price)}`;
}

export function CartSummary() {
  const { totalProductPrice, membershipDiscount, shippingFee, totalPayment } =
    useCartContext();
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>예상 결제금액</span>
        <div className={styles.priceList}>
          <Description>
            <Description.Label className={styles.priceLabel}>
              총 상품금액
            </Description.Label>
            <Description.Value className={styles.priceValue}>
              {formatPrice(totalProductPrice)}
            </Description.Value>
          </Description>
          <Description>
            <Description.Label className={styles.priceLabelBlue}>
              아지트 멤버십 할인
            </Description.Label>
            <Description.Value className={styles.priceValueBlue}>
              {formatDiscount(membershipDiscount)}
            </Description.Value>
          </Description>
          <Description>
            <Description.Label className={styles.priceLabel}>
              배송비
            </Description.Label>
            <Description.Value className={styles.priceValue}>
              {formatPrice(shippingFee)}
            </Description.Value>
          </Description>
        </div>
      </div>
      <Divider />
      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>총 결제 금액</span>
        <span className={styles.totalValue}>{formatPrice(totalPayment)}</span>
      </div>
    </div>
  );
}
