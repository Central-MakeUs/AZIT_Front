import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header } from '@azit/design-system/header';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import * as styles from '../styles/MemberManagementPage.css';

export function MemberManagementPage() {
  // TODO: 실제 API에서 크루 멤버 리스트 가져오기

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header left={<BackButton />} center="멤버 관리" />
        </div>
        <div className={styles.mainContainer}>
          {/* TODO: 멤버 관리 콘텐츠 */}
        </div>
      </AppLayout>
    </AppScreen>
  );
}
