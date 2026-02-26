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
            <button onClick={onCopyCode} className={styles.tabButton}>
              <span>{inviteCode}</span>
              <span className={styles.iconWrap}>
                <CopyIcon size={16} className={styles.copyIcon} />
              </span>
            </button>
          </div>
          <div className={styles.shareContent}>
            <button onClick={onShare} className={styles.tabButton}>
              <span>공유하기</span>
              <span className={styles.iconWrap}>
                <UploadIcon size={16} className={styles.shareIcon} />
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
