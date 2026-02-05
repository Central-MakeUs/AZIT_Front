import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header } from '@azit/design-system/header';
import { BellIcon } from '@azit/design-system/icon';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation';
import { ScheduleAttendanceSection } from '@/widgets/schedule-attendance/ui';
import { ScheduleListItem } from '@/widgets/schedule-list/ui';
import { mockActivityActivation, mockScheduleList } from '@/shared/mock/home';
import { logo } from '@/shared/styles/logo.css';
import * as styles from '../styles/HomePage.css';
import { useFlow } from '@/app/routes/stackflow';

export function HomePage() {
  const { push } = useFlow();

  const handleClick = () => {
    push('AlertPage', {});
  };

  return (
    <AppScreen>
      <AppLayout>
        <Header
          sticky
          left={<h1 className={logo}>AZIT</h1>}
          right={
            <button onClick={handleClick}>
              <BellIcon size={24} color="default" />
            </button>
          }
        />
        <div className={styles.pageContainer}>
          <ScheduleAttendanceSection activity={mockActivityActivation} />
          <div className={styles.scheduleSection}>
            <h2 className={styles.sectionTitle}>내 일정</h2>
            <div className={styles.scheduleList}>
              {mockScheduleList.map((item) => (
                <ScheduleListItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
      <BottomNavigation activeTab="home" />
    </AppScreen>
  );
}
