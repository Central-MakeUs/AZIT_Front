import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header, vars } from '@azit/design-system';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation';
import { MypageProfileSection, MypageMenuSection } from '@/features/mypage/ui';
import {
  mockMypageProfile,
  mockMypageMenuSections,
} from '@/shared/mock/mypage';
import * as styles from '../styles/Mypage.css';

export function Mypage() {
  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <Header sticky center="마이페이지" />
        <div className={styles.pageContainer}>
          <div className={styles.contentWrapper}>
            <MypageProfileSection profile={mockMypageProfile} />
            <div className={styles.menuSectionWrapper}>
              {mockMypageMenuSections.map((section) => (
                <MypageMenuSection key={section.id} section={section} />
              ))}
            </div>
            <button
              type="button"
              className={styles.logoutButton}
              onClick={() => {}}
            >
              로그아웃
            </button>
          </div>
        </div>
        <BottomNavigation activeTab="mypage" />
      </AppLayout>
    </AppScreen>
  );
}
