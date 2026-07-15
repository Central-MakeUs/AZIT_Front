import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { ChevronDownIcon, PlusIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  type Dispatch,
  type SetStateAction,
  Suspense,
  useEffect,
  useState,
} from 'react';

import { useFlow } from '@/app/routes/stackflow';

import { ScheduleSectionLayout } from '@/widgets/ScheduleSectionLayout/ui';
import { ScheduleListSkeleton } from '@/widgets/Skeleton/ui';

import { scheduleQueries } from '@/features/Schedule/api/queries';
import {
  ScheduleCrewSelectBottomSheet,
  ScheduleFilterTab,
} from '@/features/Schedule/ui';

import { ScheduleList } from '@/entities/Schedule/ui';
import { userQueries } from '@/entities/User/api/queries';
import { RoundProfileImage } from '@/entities/User/ui/RoundProfileImage';

import { formatDate } from '@/shared/lib/formatters';
import { useCalendar } from '@/shared/lib/useCalendar';
import { scrollContainer } from '@/shared/styles/container.css';
import type { RunType } from '@/shared/types/schedule';
import { ScheduleCalendar } from '@/shared/ui/calendar/ui/ScheduleCalendar';
import { BusinessErrorFallback, DomainErrorBoundary } from '@/shared/ui/error';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation/BottomNavigation';

import * as styles from './index.css';

interface ScheduleCrewContentProps {
  crewId: number;
  activeFilter: RunType;
  setActiveFilter: (filter: RunType) => void;
  searchDate: string;
  viewDate: Date;
  selectedDate: Date;
  setViewDate: Dispatch<SetStateAction<Date>>;
  handleDateChange: (date: Date) => void;
}

function ScheduleCrewContent({
  crewId,
  activeFilter,
  setActiveFilter,
  searchDate,
  viewDate,
  selectedDate,
  setViewDate,
  handleDateChange,
}: ScheduleCrewContentProps) {
  const { push } = useFlow();
  const yearMonth = formatDate(viewDate, 'YYYY-MM');

  const { data: scheduleList = [] } = useSuspenseQuery(
    scheduleQueries.getScheduleListQuery(crewId, {
      runType: activeFilter,
      yearMonth: searchDate.split('-').length === 2 ? searchDate : undefined,
      date: searchDate.split('-').length === 3 ? searchDate : undefined,
    })
  );

  const { data: scheduleCalendarList = [] } = useSuspenseQuery(
    scheduleQueries.getScheduleCalendarQuery(crewId, { yearMonth })
  );

  return (
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
              emptyState={
                <div className={styles.emptyContainer}>
                  <img
                    src="/icons/running-person.svg"
                    alt=""
                    width={64}
                    height={64}
                  />
                  <p className={styles.emptyText}>등록된 일정이 없어요</p>
                  <Button
                    size="medium"
                    onClick={() => {
                      const params = selectedDate ? { date: selectedDate } : {};
                      push('ScheduleCreatePage', params);
                    }}
                    className={styles.addScheduleButton}
                  >
                    일정 추가하기
                  </Button>
                </div>
              }
            />
          </>
        }
      />
    </div>
  );
}

interface SchedulePageContentProps {
  activeFilter: RunType;
  setActiveFilter: (filter: RunType) => void;
  selectedDate: Date;
  viewDate: Date;
  setViewDate: Dispatch<SetStateAction<Date>>;
  handleDateChange: (date: Date) => void;
  selectedCrewId: number | null;
  setSelectedCrewId: (id: number | null) => void;
  isCrewSelectOpen: boolean;
  setIsCrewSelectOpen: (open: boolean) => void;
  searchDate: string;
}

function SchedulePageContent({
  activeFilter,
  setActiveFilter,
  selectedDate,
  viewDate,
  setViewDate,
  handleDateChange,
  selectedCrewId,
  setSelectedCrewId,
  isCrewSelectOpen,
  setIsCrewSelectOpen,
  searchDate,
}: SchedulePageContentProps) {
  const { push } = useFlow();

  const { data: joinedCrews } = useSuspenseQuery(
    userQueries.joinedCrewsQuery()
  );
  const hasCrews = joinedCrews.length > 0;
  const crewId = selectedCrewId ?? joinedCrews[0]?.crewId ?? 0;
  const selectedCrew =
    joinedCrews.find((c) => c.crewId === selectedCrewId) ?? joinedCrews[0];

  return (
    <>
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
      {hasCrews ? (
        <ScheduleCrewContent
          crewId={crewId}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          searchDate={searchDate}
          viewDate={viewDate}
          selectedDate={selectedDate}
          setViewDate={setViewDate}
          handleDateChange={handleDateChange}
        />
      ) : (
        <div className={scrollContainer}>
          <ScheduleSectionLayout
            topSection={
              <ScheduleCalendar
                explicitViewDate={viewDate}
                onChangeExplicitViewDate={setViewDate}
                value={selectedDate}
                onChange={handleDateChange}
                scheduleData={[]}
              />
            }
            scheduleContent={
              <>
                <ScheduleFilterTab
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                />
                <ScheduleList
                  items={[]}
                  emptyState={
                    <div className={styles.emptyContainer}>
                      <img
                        src="/icons/running-person.svg"
                        alt=""
                        width={64}
                        height={64}
                      />
                      <p className={styles.emptyText}>
                        가입되어 있는 크루가 없어요
                      </p>
                      <Button
                        size="medium"
                        className={styles.addScheduleButton}
                        onClick={() => {
                          push(
                            'OnboardingPage',
                            { isExtra: 'true' },
                            { animate: true }
                          );
                        }}
                      >
                        새로운 크루 가입하기
                      </Button>
                    </div>
                  }
                />
              </>
            }
          />
        </div>
      )}
      {hasCrews && (
        <ScheduleCrewSelectBottomSheet
          isOpen={isCrewSelectOpen}
          onClose={() => setIsCrewSelectOpen(false)}
          crews={joinedCrews}
          selectedCrewId={selectedCrewId ?? joinedCrews[0]?.crewId ?? null}
          onSelect={setSelectedCrewId}
        />
      )}
    </>
  );
}

export function SchedulePage() {
  const [activeFilter, setActiveFilter] = useState<RunType>(undefined);
  const [isCrewSelectOpen, setIsCrewSelectOpen] = useState(false);
  const [selectedCrewId, setSelectedCrewId] = useState<number | null>(null);

  const { selectedDate, setSelectedDate, viewDate, setViewDate } =
    useCalendar();
  const [searchDate, setSearchDate] = useState<string>(
    formatDate(selectedDate, 'YYYY-MM-DD')
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

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

  return (
    <AppScreen>
      <AppLayout>
        <DomainErrorBoundary
          fallback={({ error, reset }) => (
            <BusinessErrorFallback error={error} onReset={reset} />
          )}
        >
          <Suspense
            fallback={
              <>
                <Header sticky />
                <div className={scrollContainer}>
                  <ScheduleSectionLayout
                    topSection={
                      <ScheduleCalendar
                        explicitViewDate={viewDate}
                        onChangeExplicitViewDate={setViewDate}
                        value={selectedDate}
                        onChange={handleDateChange}
                        scheduleData={[]}
                      />
                    }
                    scheduleContent={
                      <>
                        <ScheduleFilterTab
                          activeFilter={activeFilter}
                          onFilterChange={setActiveFilter}
                        />
                        <ScheduleListSkeleton />
                      </>
                    }
                  />
                </div>
              </>
            }
          >
            <SchedulePageContent
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              selectedDate={selectedDate}
              viewDate={viewDate}
              setViewDate={setViewDate}
              handleDateChange={handleDateChange}
              selectedCrewId={selectedCrewId}
              setSelectedCrewId={setSelectedCrewId}
              isCrewSelectOpen={isCrewSelectOpen}
              setIsCrewSelectOpen={setIsCrewSelectOpen}
              searchDate={searchDate}
            />
          </Suspense>
        </DomainErrorBoundary>
        <BottomNavigation activeTab="schedule" />
      </AppLayout>
    </AppScreen>
  );
}
