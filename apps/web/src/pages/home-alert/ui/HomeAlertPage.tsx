import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header, vars } from '@azit/design-system';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import { HomeAlertList } from '@/features/home-alert/ui';
import * as styles from '../styles/HomeAlertPage.css.ts';

export function HomeAlertPage() {
  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <Header sticky left={<BackButton />} center="알림" />
        <div className={styles.pageContainer}>
          <HomeAlertList />
        </div>
      </AppLayout>
    </AppScreen>
  );
}
