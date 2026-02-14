import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import * as styles from '@/pages/home-alert/styles/HomeAlertPage.css.ts';

import { HomeAlertList } from '@/features/home-alert/ui';

import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

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
