import { AlertDialog } from '@azit/design-system/alert-dialog';
import { useWithdraw } from '@/features/auth/model';
import * as styles from '../styles/WithdrawButton.css';

export function WithdrawButton() {
  const { handleWithdraw } = useWithdraw();

  return (
    <AlertDialog
      trigger={
        <button type="button" className={styles.withdrawButton}>
          회원탈퇴
        </button>
      }
      title="정말로 탈퇴하시겠습니까?"
      description="탈퇴한 계정은 복구할 수 없어요"
      actionText="탈퇴하기"
      cancelText="취소하기"
      onAction={handleWithdraw}
    />
  );
}
