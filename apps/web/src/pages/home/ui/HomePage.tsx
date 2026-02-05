import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header } from '@azit/design-system/header';
import { BellIcon } from '@azit/design-system/icon';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation';
import { ScheduleAttendanceSection } from '@/widgets/schedule-attendance/ui';
import { ScheduleList } from '@/widgets/schedule-list/ui';
import { ScheduleSectionLayout } from '@/widgets/schedule-section-layout/ui';
import { mockActivityActivation, mockScheduleList } from '@/shared/mock/home';
import { logo } from '@/shared/styles/logo.css';
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
        <ScheduleSectionLayout
          topSection={
            <ScheduleAttendanceSection activity={mockActivityActivation} />
          }
          scheduleTitle="내 일정"
          scheduleContent={<ScheduleList items={mockScheduleList} />}
        />
      </AppLayout>
      <BottomNavigation activeTab="home" />
    </AppScreen>
  );
}
