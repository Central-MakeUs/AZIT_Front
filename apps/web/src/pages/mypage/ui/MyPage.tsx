import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';

import { getMypageMenu } from '@/pages/mypage/config/menu';
import * as styles from '@/pages/mypage/styles/MyPage.css';

import {
  MyProfileSection,
  MyCrewInfoSection,
  MyMenuSection,
} from '@/widgets/mypage/ui';

import { WithdrawButton } from '@/features/auth/ui';

import { crewQueries, memberQueries } from '@/shared/queries';
import { useAuthStore } from '@/shared/store/auth';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation';

export function MyPage() {
  const { logout } = useAuthStore();

  const { data: myInfoData, isLoading } = useQuery(memberQueries.myInfoQuery());

  const myInfo = myInfoData?.ok ? myInfoData.data.result : undefined;
  const isLeader = myInfo?.crewMemberRole === 'LEADER';

  const { data: crewInfoData } = useQuery({
    ...crewQueries.crewInfoQuery(myInfo?.invitationCode ?? ''),
    enabled: !!myInfo?.invitationCode,
  });

  if (isLoading || !myInfoData?.ok || !myInfo) {
    return <></>;
  }

  const memberCount = crewInfoData?.ok
    ? (crewInfoData.data.result.memberCount ?? 0)
    : 0;
  const cannotWithdraw = isLeader && memberCount !== 1;

  const filteredMenu = getMypageMenu(myInfo.crewMemberRole, myInfo.crewId);

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header center="마이페이지" />
        </div>
        <div className={styles.mainContainer}>
          <MyProfileSection profile={myInfo} />
          <div className={styles.menuSectionWrapper}>
            <MyCrewInfoSection
              crewName={myInfo.crewName}
              crewImageUrl={myInfo.crewImageUrl}
              inviteCode={myInfo.invitationCode}
            />
            {filteredMenu.map((section) => (
              <MyMenuSection key={section.id} section={section} />
            ))}
          </div>
          <div className={styles.buttonWrapper}>
            <div className={styles.buttonContainer}>
              <div className={styles.logoutButtonWrapper}>
                <button
                  type="button"
                  className={styles.logoutButton}
                  onClick={logout}
                >
                  로그아웃
                </button>
              </div>
              <div className={styles.withdrawButtonWrapper}>
                <WithdrawButton cannotWithdraw={cannotWithdraw} />
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
      <BottomNavigation activeTab="mypage" />
    </AppScreen>
  );
}
