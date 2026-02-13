import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useState, useCallback } from 'react';

import * as styles from '@/pages/mypage-notification/styles/NotificationSettingsPage.css';

import { NotificationSettingsList } from '@/features/mypage-notification/ui';

import {
  mockNotificationSettings,
  type NotificationSettingItem,
} from '@/shared/mock/mypage-notification';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

export function NotificationSettingsPage() {
  const [settings, setSettings] = useState<NotificationSettingItem[]>(
    () => mockNotificationSettings
  );

  const handleToggle = useCallback((id: string, enabled: boolean) => {
    setSettings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled } : item))
    );
  }, []);

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header
            left={<BackButton />}
            center="알림 설정"
            className={styles.header}
          />
        </div>
        <div className={styles.mainContainer}>
          <NotificationSettingsList items={settings} onToggle={handleToggle} />
        </div>
      </AppLayout>
    </AppScreen>
  );
}
