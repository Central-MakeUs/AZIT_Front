import { Button } from '@azit/design-system/button';

import * as styles from '@/features/address/styles/AddressEmpty.css';

interface AddressEmptyStateProps {
  handleRegister: () => void;
}

export function AddressEmpty({ handleRegister }: AddressEmptyStateProps) {
  return (
    <div className={styles.container}>
      <div className={styles.iconTextContainer}>
        <img
          src="/icons/truck.svg"
          width={64}
          height={64}
          className={styles.emptyStateIcon}
          aria-hidden
        />
        <p className={styles.emptyText}>배송지를 등록해주세요</p>
      </div>
      <Button size="medium" state="outline" onClick={handleRegister}>
        배송지 등록하기
      </Button>
    </div>
  );
}
