import { useState, useCallback } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header, vars } from '@azit/design-system';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import { NotificationSettingsList } from '@/features/notification-settings/ui';
import {
  mockNotificationSettings,
  type NotificationSettingItem,
} from '@/shared/mock/notification-settings';
import * as styles from '../styles/NotificationSettingsPage.css';

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
        <Header
          sticky
          left={<BackButton />}
          center="알림 설정"
          className={styles.header}
        />
        <div className={styles.pageContainer}>
          <div className={styles.contentWrapper}>
            <NotificationSettingsList
              items={settings}
              onToggle={handleToggle}
            />
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
