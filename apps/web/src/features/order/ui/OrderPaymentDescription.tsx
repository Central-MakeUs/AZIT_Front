import { Description } from '@azit/design-system/description';
import { CopyIcon } from '@azit/design-system/icon';
import { Input } from '@azit/design-system/input';

import * as styles from '@/features/order/styles/OrderPaymentDescription.css';

import { toastSuccess } from '@/shared/ui/toast';

import type { DepositAccountInfo } from '@/entities/order/model';

interface OrderPaymentDescriptionProps extends DepositAccountInfo {
  depositorName?: string;
  onDepositorNameChange?: (value: string) => void;
}

export function OrderPaymentDescription({
  bankName,
  accountHolder,
  accountNumber,
  paymentDeadline,
  depositorName = '',
  onDepositorNameChange,
}: OrderPaymentDescriptionProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber!.replace(/-/g, ''));
    toastSuccess('계좌번호가 복사되었습니다.');
  };

  return (
    <div className={styles.container}>
      <Description className={styles.description}>
        <Description.Label className={styles.label}>
          계좌 번호
        </Description.Label>
        <Description.Value className={styles.value}>
          <div className={styles.bankValue}>
            {bankName} (예금주: {accountHolder})
            <p className={styles.accountNumber}>
              {accountNumber}{' '}
              <button
                type="button"
                onClick={handleCopy}
                className={styles.copyButton}
              >
                <CopyIcon size={16} color="secondary" />
              </button>
            </p>
          </div>
        </Description.Value>
      </Description>
      {paymentDeadline && (
        <Description>
          <Description.Label className={styles.label}>
            입금 기한
          </Description.Label>
          <Description.Value className={styles.value}>
            {paymentDeadline}
          </Description.Value>
        </Description>
      )}
      <Description className={styles.inputDescription}>
        <Description.Label className={styles.label}>입금자명</Description.Label>
        <Description.Value className={styles.value}>
          <Input
            placeholder="입금자명을 입력해주세요"
            value={depositorName}
            onChange={(e) => onDepositorNameChange?.(e.target.value)}
          />
        </Description.Value>
      </Description>
    </div>
  );
}
