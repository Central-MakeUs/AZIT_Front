import { useState } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header } from '@azit/design-system/header';
import { PlusIcon } from '@azit/design-system/icon';
import { AppLayout } from '@/shared/ui/layout';
import { ScheduleFilterTab } from '@/widgets/schedule-filter-tab/ui';
import { ScheduleList } from '@/widgets/schedule-list/ui';
import { ScheduleSectionLayout } from '@/widgets/schedule-section-layout/ui';
import { mockScheduleList } from '@/shared/mock/home';
import { BottomNavigation } from '@/shared/ui/navigation';
import { ScheduleCalendar } from '@/features/schedule/ui/ScheduleCalendar';

export function SchedulePage() {
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'regular' | 'lightning'
  >('all');

  return (
    <AppScreen>
      <AppLayout>
        <Header
          sticky
          center="일정"
          right={<PlusIcon size={24} color="primary" aria-hidden />}
        />
        <ScheduleSectionLayout
          topSection={<ScheduleCalendar />}
          scheduleContent={
            <>
              <ScheduleFilterTab
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
              <ScheduleList items={mockScheduleList} />
            </>
          }
        />
      </AppLayout>
      <BottomNavigation activeTab="schedule" />
    </AppScreen>
  );
}
