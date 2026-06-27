import { Button } from '@azit/design-system/button';
import { CopyIcon, ShareSheetIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useActivityParams } from '@stackflow/react';
import { useEffect } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import { RoundProfileImage } from '@/widgets/profile/ui';

import { bridge } from '@/shared/lib/bridge';
import { copyToClipboard } from '@/shared/lib/clipboard';
import { AppLayout } from '@/shared/ui/layout';

import * as styles from './index.css';

type OnboardingCompleteParams = {
  role: 'leader' | 'member';
  crewName: string;
  inviteCode?: string;
};

export function OnboardingCompletePage() {
  const { role, crewName, inviteCode } =
    useActivityParams<OnboardingCompleteParams>();
  const { replace } = useFlow();

  useEffect(() => {
    if (!role || !crewName) {
      replace('HomePage', {}, { animate: false });
    }
  }, [role, crewName, replace]);

  if (!role || !crewName) {
    return null;
  }

  const handleGoMyPage = () => {
    replace('Mypage', {}, { animate: false });
  };

  const handleCopyCode = () => {
    if (inviteCode) {
      copyToClipboard(inviteCode, '초대 코드');
    }
  };

  const handleShare = async () => {
    if (inviteCode) {
      await bridge.shareInviteCode(inviteCode, crewName);
    }
  };

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.container}>
          <div className={styles.profileSection}>
            <div className={styles.profileInfo}>
              <RoundProfileImage src="/azit.png" size={96} />
              <div className={styles.crewNameWrapper}>
                <span className={styles.crewName}>{crewName}</span>
                {role === 'member' && (
                  <span className={styles.waitingBadge}>승인 대기중</span>
                )}
              </div>
            </div>
            <p className={styles.description}>
              {role === 'leader'
                ? '크루가 생성되었어요\n초대 코드 공유를 통해 멤버를 초대할 수 있어요'
                : '가입 요청이 완료되었어요\n요청이 승인되면 알림으로 알려드릴게요'}
            </p>
          </div>

          {role === 'leader' && inviteCode && (
            <div className={styles.inviteSection}>
              <div className={styles.inviteCodeWrapper}>
                <div className={styles.inviteCodeField}>
                  <span className={styles.inviteCodeText}>{inviteCode}</span>
                </div>
                <button
                  type="button"
                  className={styles.copyButton}
                  onClick={handleCopyCode}
                  aria-label="코드 복사"
                >
                  <CopyIcon size={20} />
                </button>
              </div>
              <button
                type="button"
                className={styles.shareButton}
                onClick={handleShare}
              >
                <ShareSheetIcon size={20} />
                <span className={styles.shareButtonText}>공유하기</span>
              </button>
            </div>
          )}
        </div>

        <div className={styles.buttonWrapper}>
          <Button state="active" onClick={handleGoMyPage}>
            마이페이지로 이동
          </Button>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
