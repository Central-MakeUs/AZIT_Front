import { vars } from '@azit/design-system';
import { AlertDialog } from '@azit/design-system/alert-dialog';
import { Chip } from '@azit/design-system/chip';
import { Header } from '@azit/design-system/header';
import { CopyIcon, UploadIcon } from '@azit/design-system/icon';
import { Input } from '@azit/design-system/input';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { useCrewMenu } from '@/pages/mypage/model/useCrewMenu';
import * as styles from '@/pages/mypage/styles/CrewPage.css';

import {
  MEMBER_ROLE,
  MEMBER_ROLE_LABEL,
  ROLE_CHIP_TYPE_MAP,
} from '@/shared/constants/member-role';
import { bridge } from '@/shared/lib/bridge';
import { copyToClipboard } from '@/shared/lib/clipboard';
import { memberQueries } from '@/shared/queries';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';
import { MenuSection } from '@/shared/ui/menu';

export function CrewPage({ params }: { params?: { id?: string } }) {
  const [dissolveInput, setDissolveInput] = useState('');

  const crewId = Number(params?.id) || 0;

  const { data: myCrewsData, isLoading } = useQuery(
    memberQueries.myCrewsQuery()
  );
  const crew = myCrewsData?.find((c) => c.crewId === crewId) ?? null;

  const isLeader = crew?.memberRole === MEMBER_ROLE.LEADER;

  const menuSections = useCrewMenu(crew?.memberRole ?? 'MEMBER', crewId);

  if (isLoading || !crew) return null;

  const onCopyCode = () => {
    if (crew.invitationCode) {
      copyToClipboard(crew.invitationCode, '초대 코드');
    }
  };

  const onShare = async () => {
    if (crew.invitationCode) {
      await bridge.shareInviteCode(crew.invitationCode, crew.crewName);
    }
  };

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header left={<BackButton />} center="나의 크루" color="sub" />
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.contentWrapper}>
            <div className={styles.profileSection}>
              <div className={styles.profileTop}>
                <div className={styles.avatarWrapper}>
                  <img
                    src={crew.crewImageUrl}
                    alt="크루 이미지"
                    className={styles.avatar}
                  />
                  <div className={styles.profileInfo}>
                    <span className={styles.crewName}>{crew.crewName}</span>
                    {crew.memberRole && (
                      <Chip type={ROLE_CHIP_TYPE_MAP[crew.memberRole]}>
                        {MEMBER_ROLE_LABEL[crew.memberRole]}
                      </Chip>
                    )}
                  </div>
                </div>
                {crew.invitationCode && (
                  <div className={styles.inviteCard}>
                    <button
                      type="button"
                      className={styles.inviteCardLeft}
                      onClick={onCopyCode}
                    >
                      <span className={styles.inviteCode}>
                        {crew.invitationCode}
                      </span>
                      <CopyIcon size={16} />
                    </button>
                    <div className={styles.divider} />
                    <button
                      type="button"
                      className={styles.inviteCardRight}
                      onClick={onShare}
                    >
                      <span className={styles.shareText}>공유하기</span>
                      <UploadIcon size={16} />
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.menuSectionWrapper}>
                {menuSections.map((section) => (
                  <MenuSection key={section.id} section={section} />
                ))}
              </div>
            </div>
            {isLeader ? (
              <AlertDialog
                trigger={
                  <button type="button" className={styles.dissolveButton}>
                    크루 해산하기
                  </button>
                }
                title="정말 크루를 해산하시겠어요?"
                description={`모든 멤버가 퇴장되며, 지금까지의 출석 로그와\n데이터가 삭제되어 절대 복구할 수 없어요.`}
                cancelText="취소하기"
                actionText="해산하기"
                actionVariant="danger"
                actionDisabled={dissolveInput !== crew.crewName}
              >
                <div className={styles.dissolveInputContainer}>
                  <p className={styles.dissolveInputGuide}>
                    해산하려면 &apos;{crew.crewName}&apos;을 입력해 주세요.
                  </p>
                  <Input
                    placeholder="크루 이름을 정확히 입력해 주세요."
                    value={dissolveInput}
                    onChange={(e) => setDissolveInput(e.target.value)}
                  />
                </div>
              </AlertDialog>
            ) : (
              <AlertDialog
                trigger={
                  <button type="button" className={styles.dissolveButton}>
                    이 크루에서 나가기
                  </button>
                }
                title="정말 크루를 나가시겠어요?"
                description={`크루를 나가면 출석 로그와 활동 내역이\n모두 삭제되며 복구할 수 없어요.`}
                cancelText="취소하기"
                actionText="나가기"
              />
            )}
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
