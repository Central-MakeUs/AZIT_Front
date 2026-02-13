import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { HomeAlertList } from '@/features/home-alert/ui';

import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

import * as styles from '../styles/HomeAlertPage.css.ts';

export function HomeAlertPage() {
  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <Header color="sub" sticky left={<BackButton />} center="알림" />
        <div className={styles.pageContainer}>
          <HomeAlertList />
        </div>
      </AppLayout>
    </AppScreen>
  );
}
