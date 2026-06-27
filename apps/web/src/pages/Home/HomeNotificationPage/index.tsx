import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';

import { NotificationList } from '@/widgets/notification/ui';

import { mockNotificationList } from '@/shared/mock/notification';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

import * as styles from './index.css';

export function HomeNotificationPage() {
  const { data: notificationList = [] } = useQuery({
    queryKey: ['notificationList'],
    queryFn: () => mockNotificationList,
  });

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <Header color="sub" sticky left={<BackButton />} center="알림" />
        <div className={styles.pageContainer}>
          {notificationList.length === 0 ? (
            <div className={styles.emptyContainer}>
              <img src="/icons/bell.svg" width={64} height={64} alt="" />
              <p className={styles.emptyText}>새로운 소식을 기다려보세요!</p>
            </div>
          ) : (
            <NotificationList items={notificationList} />
          )}
        </div>
      </AppLayout>
    </AppScreen>
  );
}
