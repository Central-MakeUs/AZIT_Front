import { CopyIcon, UploadIcon } from '@azit/design-system/icon';

import * as styles from '@/widgets/mypage/styles/MyCrewInfoSection.css';

import { bridge } from '@/shared/lib/bridge';
import { copyToClipboard } from '@/shared/lib/clipboard';

export interface MyCrewInfoSectionProps {
  crewName: string;
  crewImageUrl: string;
  inviteCode: string | null;
}

export function MyCrewInfoSection({
  crewName,
  crewImageUrl,
  inviteCode,
}: MyCrewInfoSectionProps) {
  const onCopyCode = () => {
    if (inviteCode) {
      copyToClipboard(inviteCode, '초대 코드');
    }
  };

  const onShare = async () => {
    if (inviteCode) {
      await bridge.shareInviteCode(inviteCode, crewName);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <img
            src={crewImageUrl}
            alt="프로필 이미지"
            className={styles.avatar}
          />
        </div>
        <span className={styles.crewName}>{crewName}</span>
      </div>
      {inviteCode && (
        <div className={styles.cardFooter}>
          <div className={styles.copyContent}>
            <span>{inviteCode}</span>
            <button
              type="button"
              onClick={onCopyCode}
              aria-label="초대 코드 복사"
              className={styles.iconWrap}
            >
              <CopyIcon size={16} className={styles.copyIcon} />
            </button>
          </div>
          <div className={styles.shareContent}>
            <span>공유하기</span>
            <button
              type="button"
              onClick={onShare}
              aria-label="크루 공유"
              className={styles.iconWrap}
            >
              <UploadIcon size={16} className={styles.shareIcon} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
