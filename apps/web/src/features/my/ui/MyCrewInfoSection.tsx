import { CopyIcon, UploadIcon } from '@azit/design-system/icon';

import * as styles from '@/features/my/styles/MyCrewInfoSection.css';

import { bridge } from '@/shared/lib/bridge';

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
      navigator.clipboard.writeText(inviteCode);
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
