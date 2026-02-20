import { Header } from '@azit/design-system/header';
import { BellIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';

import { useFlow } from '@/app/routes/stackflow';

import { ScheduleListSkeleton } from '@/widgets/skeleton/ui';
import { ScheduleAttendanceSection } from '@/widgets/schedule-attendance/ui';
import { ScheduleSectionLayout } from '@/widgets/schedule-section-layout/ui';

import { mockActivityActivation } from '@/shared/mock/home';
import { memberQueries } from '@/shared/queries';
import { scheduleQueries } from '@/shared/queries/schedule';
import { scrollContainer } from '@/shared/styles/container.css';
import { logo } from '@/shared/styles/logo.css';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation';

import { ScheduleList } from '@/entities/schedule/ui/ScheduleList';

export function HomePage() {
  const { push } = useFlow();

  const handleClick = () => {
    push('AlertPage', {});
  };

  const { data: myInfoData } = useQuery(memberQueries.myInfoQuery());
  const crewId = myInfoData?.ok ? myInfoData.data.result.crewId : 0;

  const { data: scheduleList = [], isLoading } = useQuery({
    ...scheduleQueries.getMemberScheduleListQuery(),
    enabled: crewId > 0,
  });

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
        <div className={scrollContainer}>
          <ScheduleSectionLayout
            topSection={
              <ScheduleAttendanceSection activity={mockActivityActivation} />
            }
            scheduleTitle="내 일정"
            scheduleContent={
              isLoading ? (
                <ScheduleListSkeleton />
              ) : (
                <ScheduleList items={scheduleList} isHomePage />
              )
            }
          />
        </div>
      </AppLayout>
      <BottomNavigation activeTab="home" />
    </AppScreen>
  );
}
