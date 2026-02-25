import { Description } from '@azit/design-system/description';
import { CopyIcon } from '@azit/design-system/icon';

import * as styles from '@/widgets/order-complete/styles/DepositInfoSection.css';

import { copyToClipboard } from '@/shared/lib/clipboard';

import type { DepositAccountInfo } from '@/entities/order/model';

interface DepositInfoSectionProps extends DepositAccountInfo {
  depositorName: string;
}

export function DepositInfoSection({
  bankName,
  accountHolder,
  accountNumber,
  paymentDeadline,
  depositorName,
}: DepositInfoSectionProps) {
  const handleCopy = () => {
    copyToClipboard(accountNumber?.replace(/-/g, '') ?? '', '계좌번호');
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>입금 정보</p>
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
                aria-label="계좌번호 복사"
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
          {depositorName}
        </Description.Value>
      </Description>
    </div>
  );
}
