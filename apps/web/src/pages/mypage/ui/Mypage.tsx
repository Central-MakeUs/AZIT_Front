import { AppScreen } from '@stackflow/plugin-basic-ui';
import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation';
import { MypageProfileSection, MypageMenuSection } from '@/features/mypage/ui';
import {
  mockMypageProfile,
  mockMypageMenuSections,
} from '@/shared/mock/mypage';
import * as styles from '../styles/Mypage.css';
import { useAuthStore } from '@/shared/store/auth';
import { MYPAGE_MENU } from '@/features/mypage/model/menu';

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
          <button
            type="button"
            className={styles.logoutButton}
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      </AppLayout>
      <BottomNavigation activeTab="mypage" />
    </AppScreen>
  );
}
