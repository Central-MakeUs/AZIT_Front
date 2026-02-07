import { Button } from '@azit/design-system/button';
import { TruckIcon } from '@azit/design-system/icon';
import * as styles from '../styles/AddressEmpty.css';

interface AddressEmptyStateProps {
  onRegister: () => void;
}

export function AddressEmpty({ onRegister }: AddressEmptyStateProps) {
  return (
    <div className={styles.container}>
      <div className={styles.iconTextContainer}>
        <TruckIcon size={64} className={styles.emptyStateIcon} aria-hidden />
        <p className={styles.emptyText}>배송지를 등록해주세요</p>
      </div>
      <Button size="medium" state="outline" onClick={onRegister}>
        배송지 등록하기
      </Button>
    </div>
  );
}
