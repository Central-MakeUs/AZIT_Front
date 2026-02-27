import { Header } from '@azit/design-system/header';
import { PlusIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import { ScheduleCalendar } from '@/widgets/schedule-calendar/ui/ScheduleCalendar';
import { ScheduleFilterTab } from '@/widgets/schedule-filter-tab/ui';
import { ScheduleSectionLayout } from '@/widgets/schedule-section-layout/ui';

import { formatDate } from '@/shared/lib/formatters';
import { useCalendar } from '@/shared/lib/useCalendar';
import { memberQueries } from '@/shared/queries/member';
import { scheduleQueries } from '@/shared/queries/schedule';
import { scrollContainer } from '@/shared/styles/container.css';
import type { RunType } from '@/shared/types/schedule';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation';

import { ScheduleList } from '@/entities/schedule/ui';

export function SchedulePage() {
  const { push } = useFlow();
  const [activeFilter, setActiveFilter] = useState<RunType>(undefined);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const { selectedDate, setSelectedDate, viewDate, setViewDate } =
    useCalendar();
  const [searchDate, setSearchDate] = useState<string>(
    formatDate(selectedDate, 'YYYY-MM-DD')
  );

  useEffect(() => {
    if (selectedDate.getMonth() !== viewDate.getMonth()) {
      setSearchDate(formatDate(viewDate, 'YYYY-MM'));
    } else {
      setSearchDate(formatDate(selectedDate, 'YYYY-MM-DD'));
    }
    setActiveFilter(undefined);
  }, [viewDate]);

  useEffect(() => {
    setSearchDate(formatDate(selectedDate, 'YYYY-MM-DD'));
    setActiveFilter(undefined);
  }, [selectedDate]);

  const { data: myInfoData } = useQuery(memberQueries.myInfoQuery());
  const crewId = myInfoData?.ok ? myInfoData.data.result.crewId : 0;
  const yearMonth = formatDate(viewDate, 'YYYY-MM');

  const { data: scheduleList = [], isLoading } = useQuery({
    ...scheduleQueries.getScheduleListQuery(crewId, {
      runType: activeFilter,
      yearMonth: searchDate.split('-').length === 2 ? searchDate : undefined,
      date: searchDate.split('-').length === 3 ? searchDate : undefined,
    }),
    enabled: crewId > 0,
  });

  const { data: scheduleCalendarList = [] } = useQuery({
    ...scheduleQueries.getScheduleCalendarQuery(crewId, { yearMonth }),
    enabled: crewId > 0 && !!yearMonth,
  });

  return (
    <AppScreen>
      <AppLayout>
        <Header
          sticky
          center="일정"
          right={
            <button
              type="button"
              onClick={() => {
                const params = selectedDate ? { date: selectedDate } : {};
                push('ScheduleCreatePage', params);
              }}
              aria-label="일정 등록"
            >
              <PlusIcon size={24} color="primary" aria-hidden />
            </button>
          }
        />
        <div className={scrollContainer}>
          <ScheduleSectionLayout
            topSection={
              <ScheduleCalendar
                explicitViewDate={viewDate}
                onChangeExplicitViewDate={setViewDate}
                value={selectedDate}
                onChange={handleDateChange}
                scheduleData={scheduleCalendarList}
              />
            }
            scheduleContent={
              <>
                <ScheduleFilterTab
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                />
                <ScheduleList items={scheduleList} isLoading={isLoading} />
              </>
            }
          />
        </div>
      </AppLayout>
      <BottomNavigation activeTab="schedule" />
    </AppScreen>
  );
}
