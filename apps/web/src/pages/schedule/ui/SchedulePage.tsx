import { Header } from '@azit/design-system/header';
import { PlusIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';

import { ScheduleCalendar } from '@/widgets/schedule-calendar/ui/ScheduleCalendar';
// import { ScheduleWeekCalendar } from '@/widgets/schedule-calendar/ui/ScheduleWeekCalendar';
import { ScheduleFilterTab } from '@/widgets/schedule-filter-tab/ui';
import { ScheduleSectionLayout } from '@/widgets/schedule-section-layout/ui';
import { ScheduleListSkeleton } from '@/widgets/skeleton/ui';

import { memberQueries } from '@/shared/queries/member';
import { scheduleQueries } from '@/shared/queries/schedule';
import { scrollContainer } from '@/shared/styles/container.css';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation';

import type { RunType } from '@/entities/schedule/model/schedule.types';
import { ScheduleList } from '@/entities/schedule/ui';

export function SchedulePage() {
  const [activeFilter, setActiveFilter] = useState<RunType>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [date, setDate] = useState<string | undefined>(undefined);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setDate(dayjs(date).format('YYYY-MM-DD'));
  };

  const { data: myInfoData } = useQuery(memberQueries.myInfoQuery());
  const crewId = myInfoData?.ok ? myInfoData.data.result.crewId : 0;
  const { data: scheduleList = [], isLoading } = useQuery({
    ...scheduleQueries.getScheduleListQuery(crewId, {
      runType: activeFilter,
      date,
    }),
    enabled: crewId > 0,
  });

  const { data: scheduleCalendarList = [] } = useQuery({
    ...scheduleQueries.getScheduleCalendarQuery(crewId, {
      yearMonth: dayjs(selectedDate).format('YYYY-MM'),
    }),
    enabled: crewId > 0,
  });

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
              <ScheduleCalendar
                value={selectedDate}
                onChange={handleDateChange}
                scheduleData={scheduleCalendarList}
              />
              // <ScheduleWeekCalendar
              //     value={selectedDate}
              //     onChange={handleDateChange}
              //   />
            }
            scheduleContent={
              <>
                <ScheduleFilterTab
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                />
                {isLoading ? (
                  <ScheduleListSkeleton />
                ) : (
                  <ScheduleList items={scheduleList} />
                )}
              </>
            }
          />
        </div>
      </AppLayout>
      <BottomNavigation activeTab="schedule" />
    </AppScreen>
  );
}
