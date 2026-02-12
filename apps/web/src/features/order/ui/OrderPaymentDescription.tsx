import { Description } from '@azit/design-system/description';
import type { DepositAccountInfo } from '../api/types';

import * as styles from '../styles/OrderPaymentDescription.css';
import { CopyIcon } from '@azit/design-system/icon';
import { Input } from '@azit/design-system/input';

export function OrderPaymentDescription({
  bankName,
  accountHolder,
  accountNumber,
  paymentDeadline,
}: DepositAccountInfo) {
  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber!.replace(/-/g, ''));
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
          <Input placeholder="입금자명을 입력해주세요" />
        </Description.Value>
      </Description>
    </div>
  );
}
