import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';

import { getMyPageMenu } from '@/pages/my/config/menu';
import * as styles from '@/pages/my/styles/MyPage.css';

import {
  MyProfileSection,
  MyCrewInfoSection,
  MyMenuSection,
} from '@/widgets/my/ui';

import { WithdrawButton } from '@/features/auth/ui';

import { memberQueries } from '@/shared/queries';
import { useAuthStore } from '@/shared/store/auth';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation';

export function MyPage() {
  const { logout } = useAuthStore();

  const { data: myInfoData, isLoading } = useQuery(memberQueries.myInfoQuery());

  if (isLoading || !myInfoData?.ok) {
    return <></>;
  }

  const myInfo = myInfoData.data.result;
  const filteredMenu = getMyPageMenu(myInfo.crewMemberRole, myInfo.crewId);

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
                <WithdrawButton />
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
      <BottomNavigation activeTab="mypage" />
    </AppScreen>
  );
}
