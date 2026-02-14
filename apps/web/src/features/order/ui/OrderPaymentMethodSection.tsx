import type { PaymentMethod } from '@/features/order/api/types';
import * as styles from '@/features/order/styles/OrderPaymentMethodSection.css';

interface OrderPaymentMethodSectionProps {
  paymentMethods: PaymentMethod[];
  selectedPaymentCode?: string;
  onSelect?: (method: PaymentMethod) => void;
}

export function OrderPaymentMethodSection({
  paymentMethods,
  selectedPaymentCode,
  onSelect,
}: OrderPaymentMethodSectionProps) {
  const logoUrl: Record<string, string> = {
    BANK_TRANSFER: '/icons/icon-bank.svg',
    NAVER_PAY: '/icons/icon-naverpay.svg',
  };

  const getCardClassName = (method: PaymentMethod) => {
    if (method.isEnabled === false) return styles.paymentMethodCardDisabled;
    if (method.code === selectedPaymentCode)
      return styles.paymentMethodCardSelected;
    return styles.paymentMethodCard;
  };

  return (
    <div className={styles.paymentMethodSection}>
      <p className={styles.title}>결제 수단</p>
      {paymentMethods.map((method) => (
        <div className={styles.paymentMethodContainer} key={method.code}>
          <div
            className={getCardClassName(method)}
            onClick={
              method.isEnabled !== false && onSelect
                ? () => onSelect(method)
                : undefined
            }
          >
            <div className={styles.paymentMethodContent}>
              {method.code && logoUrl[method.code] && (
                <img
                  src={logoUrl[method.code]}
                  alt={method.description ?? ''}
                  className={styles.paymentLogo}
                />
              )}
              <p className={styles.paymentName}>{method.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
