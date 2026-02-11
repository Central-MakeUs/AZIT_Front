import { useQuery } from '@tanstack/react-query';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation';
import { MyProfileSection, MyMenuSection } from '@/features/my/ui';
import { useAuthStore } from '@/shared/store/auth';
import { getMyPageMenu } from '@/features/my/model/menu';
import { AlertDialog } from '@azit/design-system/alert-dialog';
import { postWithdraw } from '@/features/auth/api/postWithdraw';
import { useFlow } from '@/app/routes/stackflow';
import { memberQueries } from '@/shared/api/queries';
import * as styles from '../styles/Mypage.css';

export function MyPage() {
  const { logout, setAccessToken, setIsInitialized } = useAuthStore();
  const { replace } = useFlow();

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
              <MyMenuSection
                key={section.id}
                section={section}
                member={myInfo}
              />
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
                  onAction={async () => {
                    const response = await postWithdraw();

                    if (response.ok) {
                      setAccessToken(undefined);
                      setIsInitialized(false);
                      replace('LoginPage', {}, { animate: false });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
      <BottomNavigation activeTab="mypage" />
    </AppScreen>
  );
}
