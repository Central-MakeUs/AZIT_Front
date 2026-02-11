import { useQuery } from '@tanstack/react-query';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation';
import { MyProfileSection, MyMenuSection } from '@/features/my/ui';
import { WithdrawButton } from '@/features/auth/ui';
import { useAuthStore } from '@/shared/store/auth';
import { getMyPageMenu } from '@/features/my/model/menu';
import { memberQueries } from '@/shared/api/queries';
import * as styles from '../styles/MyPage.css';

export function MyPage() {
  const { logout } = useAuthStore();

  const { data: myInfoData, isLoading } = useQuery(memberQueries.myInfoQuery());

  if (isLoading || !myInfoData?.ok) {
    return <></>;
  }

  const myInfo = myInfoData.data.result;
  const filteredMenu = getMyPageMenu(myInfo.crewMemberRole);

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header center="마이페이지" />
        </div>
        <div className={styles.mainContainer}>
          <MyProfileSection profile={myInfo} />

          <div className={styles.menuSectionWrapper}>
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
