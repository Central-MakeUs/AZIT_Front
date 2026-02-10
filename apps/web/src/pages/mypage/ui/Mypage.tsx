import { AppScreen } from '@stackflow/plugin-basic-ui';
import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation';
import { MypageProfileSection, MypageMenuSection } from '@/features/mypage/ui';
import { mockMypageProfile } from '@/shared/mock/mypage';
import * as styles from '../styles/Mypage.css';
import { useAuthStore } from '@/shared/store/auth';
import { MYPAGE_MENU } from '@/features/mypage/model/menu';
import { AlertDialog } from '@azit/design-system/alert-dialog';

export function Mypage() {
  const { logout } = useAuthStore();

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header center="마이페이지" />
        </div>
        <div className={styles.mainContainer}>
          <MypageProfileSection profile={mockMypageProfile} />
          <div className={styles.menuSectionWrapper}>
            {MYPAGE_MENU.map((section) => (
              <MypageMenuSection key={section.id} section={section} />
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
                  onAction={() => {
                    // TODO: 회원탈퇴 기능 구현
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
