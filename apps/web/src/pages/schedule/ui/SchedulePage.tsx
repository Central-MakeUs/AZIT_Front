import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { ChevronDownIcon, PlusIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/schedule/styles/SchedulePage.css';

import { RoundProfileImage } from '@/widgets/profile/ui/RoundProfileImage';
import { ScheduleCalendar } from '@/widgets/schedule-calendar/ui/ScheduleCalendar';
import { ScheduleCrewSelectBottomSheet } from '@/widgets/schedule-crew-select/ui/ScheduleCrewSelectBottomSheet';
import { ScheduleFilterTab } from '@/widgets/schedule-filter-tab/ui';
import { ScheduleSectionLayout } from '@/widgets/schedule-section-layout/ui';

import { formatDate } from '@/shared/lib/formatters';
import { useCalendar } from '@/shared/lib/useCalendar';
import { memberQueries } from '@/shared/queries/member';
import { scheduleQueries } from '@/shared/queries/schedule';
import { scrollContainer } from '@/shared/styles/container.css';
import type { RunType } from '@/shared/types/schedule';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation/BottomNavigation';

import { ScheduleList } from '@/entities/schedule/ui';

export function SchedulePage() {
  const { push } = useFlow();
  const [activeFilter, setActiveFilter] = useState<RunType>(undefined);
  const [isCrewSelectOpen, setIsCrewSelectOpen] = useState(false);
  const [selectedCrewId, setSelectedCrewId] = useState<number | null>(null);

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

  const { data: joinedCrews = [] } = useQuery(memberQueries.joinedCrewsQuery());
  const hasCrews = joinedCrews.length > 0;

  const crewId = selectedCrewId ?? joinedCrews[0]?.crewId ?? 0;

  const selectedCrew =
    joinedCrews.find((c) => c.crewId === selectedCrewId) ?? joinedCrews[0];

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
          left={
            hasCrews ? (
              <button
                type="button"
                onClick={() => setIsCrewSelectOpen(true)}
                className={styles.crewSelectButton}
              >
                <RoundProfileImage
                  src={selectedCrew?.imageUrl}
                  alt={selectedCrew?.name}
                  size={32}
                />
                <span className={styles.crewName}>{selectedCrew?.name}</span>
                <ChevronDownIcon size={16} />
              </button>
            ) : undefined
          }
          center={
            !hasCrews ? (
              <span className={styles.headerTitle}>일정</span>
            ) : undefined
          }
          right={
            hasCrews ? (
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
            ) : undefined
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
                <ScheduleList
                  items={scheduleList}
                  isLoading={isLoading}
                  emptyState={
                    <div className={styles.emptyContainer}>
                      <img
                        src="/icons/running-person.svg"
                        alt=""
                        width={64}
                        height={64}
                      />
                      {hasCrews ? (
                        <>
                          <p className={styles.emptyText}>
                            등록된 일정이 없어요
                          </p>
                          <Button
                            size="medium"
                            onClick={() => {
                              const params = selectedDate
                                ? { date: selectedDate }
                                : {};
                              push('ScheduleCreatePage', params);
                            }}
                            className={styles.addScheduleButton}
                          >
                            일정 추가하기
                          </Button>
                        </>
                      ) : (
                        <>
                          <p className={styles.emptyText}>
                            가입되어 있는 크루가 없어요
                          </p>
                          <Button
                            size="medium"
                            className={styles.addScheduleButton}
                            onClick={() => {
                              push('OnboardingPage', {}, { animate: true });
                            }}
                          >
                            새로운 크루 가입하기
                          </Button>
                        </>
                      )}
                    </div>
                  }
                />
              </>
            }
          />
        </div>
      </AppLayout>
      <BottomNavigation activeTab="schedule" />
      {hasCrews && (
        <ScheduleCrewSelectBottomSheet
          isOpen={isCrewSelectOpen}
          onClose={() => setIsCrewSelectOpen(false)}
          crews={joinedCrews}
          selectedCrewId={selectedCrewId ?? joinedCrews[0]?.crewId ?? null}
          onSelect={setSelectedCrewId}
        />
      )}
    </AppScreen>
  );
}
