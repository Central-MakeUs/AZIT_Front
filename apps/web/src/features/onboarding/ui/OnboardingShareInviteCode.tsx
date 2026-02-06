import { Button } from '@azit/design-system/button';
import { CopyIcon, ShareSheetIcon } from '@azit/design-system/icon';
import { RoundProfileImage } from '@/widgets/profile/ui';
import * as styles from '../styles/OnboardingShareInviteCode.css';
import { bridge } from '@/shared/lib/bridge';

export interface OnboardingShareInviteCodeProps {
  crewName: string;
  crewProfileImage: string;
  inviteCode: string;
  onNext: () => void;
}

export function OnboardingShareInviteCode({
  crewName,
  crewProfileImage,
  inviteCode,
  onNext,
}: OnboardingShareInviteCodeProps) {
  const onCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
  };

  const onShare = async () => {
    await bridge.shareInviteCode(inviteCode);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <div className={styles.profileSection}>
            <RoundProfileImage src={crewProfileImage} size={96} />
            <span className={styles.crewName}>{crewName}</span>
          </div>
          <p className={styles.description}>
            {
              '크루가 생성되었어요\n초대 코드 공유를 통해 멤버를 초대할 수 있어요'
            }
          </p>
        </div>

        <div className={styles.inviteSection}>
          <div className={styles.inviteCodeWrapper}>
            <div className={styles.inviteCodeField}>
              <span className={styles.inviteCodeText}>{inviteCode}</span>
            </div>
            <button
              type="button"
              className={styles.copyButton}
              onClick={onCopyCode}
              aria-label="코드 복사"
            >
              <CopyIcon size={20} className={styles.copyIcon} />
            </button>
          </div>

          <button
            type="button"
            className={styles.shareButton}
            onClick={onShare}
          >
            <ShareSheetIcon size={20} className={styles.shareIcon} />
            <span className={styles.shareButtonText}>공유하기</span>
          </button>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button state="active" onClick={onNext}>
          홈으로
        </Button>
      </div>
    </>
  );
}
