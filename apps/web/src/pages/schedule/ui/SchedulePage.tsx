import { Header } from '@azit/design-system/header';
import { PlusIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useState } from 'react';

import { ScheduleWeekCalendar } from '@/widgets/schedule-calendar/ui/ScheduleWeekCalendar';
import { ScheduleFilterTab } from '@/widgets/schedule-filter-tab/ui';
import { ScheduleList } from '@/widgets/schedule-list/ui';
import { ScheduleSectionLayout } from '@/widgets/schedule-section-layout/ui';

import { mockScheduleList } from '@/shared/mock/home';
import { scrollContainer } from '@/shared/styles/container.css';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation';

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
        <div className={scrollContainer}>
          <ScheduleSectionLayout
            topSection={
              <ScheduleWeekCalendar
                value={new Date()}
                onChange={() => {}}
                activeStartDate={new Date()}
                onActiveStartDateChange={() => {}}
              />
            }
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
        </div>
      </AppLayout>
      <BottomNavigation activeTab="schedule" />
    </AppScreen>
  );
}
