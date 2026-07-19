import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  type Dispatch,
  type SetStateAction,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
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
import { ScheduleWeekCalendar } from '@/shared/ui/calendar/ui/ScheduleWeekCalendar';
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
  isExpanded: boolean;
  setIsExpanded: (v: boolean) => void;
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
  isExpanded,
  setIsExpanded,
}: ScheduleCrewContentProps) {
  const { push } = useFlow();
  const yearMonth = formatDate(viewDate, 'YYYY-MM');

  // ref는 prop과 동기화 (이벤트 핸들러 클로저에서 사용)
  const isExpandedRef = useRef(isExpanded);
  useEffect(() => {
    isExpandedRef.current = isExpanded;
  }, [isExpanded]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const weeklyLayerRef = useRef<HTMLDivElement>(null);
  const monthlyLayerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchStartScrollTop = useRef(0);
  const isDragging = useRef(false);
  const collapsedH = useRef(0);
  const expandedH = useRef(0);
  const rafId = useRef(0);
  const pendingH = useRef(0);

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

  // 렌더 직후 두 레이어의 실제 높이를 측정해 저장
  useLayoutEffect(() => {
    if (!wrapperRef.current || !monthlyLayerRef.current) return;
    collapsedH.current = wrapperRef.current.offsetHeight;
    expandedH.current = monthlyLayerRef.current.scrollHeight;
    // isExpanded 상태에 따라 초기 높이 설정 (리마운트 시 복원)
    if (isExpanded) {
      wrapperRef.current.style.height = `${expandedH.current}px`;
    } else {
      wrapperRef.current.style.height = `${collapsedH.current}px`;
    }
  }, []);

  /** wrapper 높이 애니메이션 + 레이어 전환 (50% 기준 즉시 스왑, 페이드 없음) */
  const applyProgress = (progress: number) => {
    const clamped = Math.max(0, Math.min(1, progress));
    const h =
      collapsedH.current + (expandedH.current - collapsedH.current) * clamped;
    const showMonthly = clamped >= 0.5;

    if (wrapperRef.current) {
      wrapperRef.current.style.height = `${h}px`;
    }
    if (weeklyLayerRef.current) {
      weeklyLayerRef.current.style.visibility = showMonthly
        ? 'hidden'
        : 'visible';
      weeklyLayerRef.current.style.pointerEvents = showMonthly
        ? 'none'
        : 'auto';
    }
    if (monthlyLayerRef.current) {
      monthlyLayerRef.current.style.visibility = showMonthly
        ? 'visible'
        : 'hidden';
      monthlyLayerRef.current.style.pointerEvents = showMonthly
        ? 'auto'
        : 'none';
    }
  };

  /** CSS transition 추가 후 목표 progress로 snap */
  const snapTo = (targetProgress: number, onDone?: () => void) => {
    cancelAnimationFrame(rafId.current);
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const DURATION = 300;
    const startH =
      parseFloat(wrapper.style.height) ||
      (targetProgress === 1 ? collapsedH.current : expandedH.current);
    const endH =
      collapsedH.current +
      (expandedH.current - collapsedH.current) * targetProgress;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / DURATION);
      // ease-out cubic
      const ease = 1 - Math.pow(1 - t, 3);
      const h = startH + (endH - startH) * ease;
      const progress =
        (h - collapsedH.current) / (expandedH.current - collapsedH.current);
      applyProgress(progress);

      if (t < 1) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        applyProgress(targetProgress);
        onDone?.();
      }
    };

    rafId.current = requestAnimationFrame(tick);
  };

  const snapExpand = () => {
    isExpandedRef.current = true;
    snapTo(1, () => setIsExpanded(true));
  };

  const snapCollapse = () => {
    isExpandedRef.current = false;
    snapTo(0, () => setIsExpanded(false));
  };

  // touchmove는 passive:false 가 필요해 useEffect로 직접 등록
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartScrollTop.current = el.scrollTop;
      isDragging.current = false;
      cancelAnimationFrame(rafId.current);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartScrollTop.current > 5) return;
      const dy = e.touches[0].clientY - touchStartY.current;

      if (!isExpandedRef.current && dy > 0) {
        e.preventDefault();
        isDragging.current = true;
        pendingH.current = dy;

        cancelAnimationFrame(rafId.current);
        rafId.current = requestAnimationFrame(() => {
          const progress = Math.min(
            1,
            pendingH.current / (expandedH.current - collapsedH.current)
          );
          applyProgress(progress);
        });
      } else if (isExpandedRef.current && dy < 0 && el.scrollTop === 0) {
        e.preventDefault();
        isDragging.current = true;
        pendingH.current = dy;

        cancelAnimationFrame(rafId.current);
        rafId.current = requestAnimationFrame(() => {
          const progress = Math.max(
            0,
            1 + pendingH.current / (expandedH.current - collapsedH.current)
          );
          applyProgress(progress);
        });
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      const threshold = (expandedH.current - collapsedH.current) * 0.35;

      if (!isExpandedRef.current) {
        dy > threshold ? snapExpand() : snapTo(0);
      } else {
        -dy > threshold ? snapCollapse() : snapTo(1);
      }
    };

    // 마우스 휠·트랙패드: 최상단에서 위로 스크롤 시 확장
    const onWheel = (e: WheelEvent) => {
      if (el.scrollTop === 0 && e.deltaY < -5 && !isExpandedRef.current) {
        snapExpand();
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  // 목록을 스크롤하면 월간 → 주간으로 축소
  const handleScroll = () => {
    if (isExpandedRef.current && (scrollRef.current?.scrollTop ?? 0) > 30) {
      snapCollapse();
    }
  };

  return (
    <div ref={scrollRef} className={scrollContainer} onScroll={handleScroll}>
      <ScheduleSectionLayout
        topSection={
          <div style={{ width: '100%' }}>
            {/* 전환 중에도 항상 유지되는 공통 헤더 */}
            <div className={styles.calendarPersistentHeader}>
              <span className={styles.calendarPersistentTitle}>
                {formatDate(viewDate, 'YYYY년 M월')}
              </span>
              {isExpanded && (
                <div className={styles.calendarNavButtons}>
                  <button
                    type="button"
                    className={styles.calendarNavButton}
                    onClick={() =>
                      setViewDate(
                        (d) => new Date(d.getFullYear(), d.getMonth() - 1, 1)
                      )
                    }
                  >
                    <ChevronLeftIcon
                      size={24}
                      style={{ color: vars.colors.blue80 }}
                    />
                  </button>
                  <button
                    type="button"
                    className={styles.calendarNavButton}
                    onClick={() =>
                      setViewDate(
                        (d) => new Date(d.getFullYear(), d.getMonth() + 1, 1)
                      )
                    }
                  >
                    <ChevronRightIcon
                      size={24}
                      style={{ color: vars.colors.blue80 }}
                    />
                  </button>
                </div>
              )}
            </div>

            <div ref={wrapperRef} className={styles.calendarWrapper}>
              {/* 주간 캘린더: in-flow → wrapper 초기 높이 결정 */}
              <div
                ref={weeklyLayerRef}
                style={{
                  visibility: isExpanded ? 'hidden' : 'visible',
                  pointerEvents: isExpanded ? 'none' : 'auto',
                }}
              >
                <ScheduleWeekCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  scheduleData={scheduleCalendarList}
                  hideHeader
                />
              </div>
              {/* 월간 캘린더: absolute → 제스처로 전환 */}
              <div
                ref={monthlyLayerRef}
                className={styles.calendarMonthlyLayer}
                style={{
                  visibility: isExpanded ? 'visible' : 'hidden',
                  pointerEvents: isExpanded ? 'auto' : 'none',
                }}
              >
                <ScheduleCalendar
                  explicitViewDate={viewDate}
                  onChangeExplicitViewDate={setViewDate}
                  value={selectedDate}
                  onChange={handleDateChange}
                  scheduleData={scheduleCalendarList}
                  hideHeader
                />
              </div>
            </div>
          </div>
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
  const [isExpanded, setIsExpanded] = useState(false);

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
        <Suspense
          fallback={
            <div className={scrollContainer}>
              <ScheduleSectionLayout
                topSection={
                  <div style={{ width: '100%' }}>
                    <div className={styles.calendarPersistentHeader}>
                      <span className={styles.calendarPersistentTitle}>
                        {formatDate(viewDate, 'YYYY년 M월')}
                      </span>
                      {isExpanded && (
                        <div className={styles.calendarNavButtons}>
                          <button
                            type="button"
                            className={styles.calendarNavButton}
                            onClick={() =>
                              setViewDate(
                                (d) =>
                                  new Date(d.getFullYear(), d.getMonth() - 1, 1)
                              )
                            }
                          >
                            <ChevronLeftIcon
                              size={24}
                              style={{ color: vars.colors.blue80 }}
                            />
                          </button>
                          <button
                            type="button"
                            className={styles.calendarNavButton}
                            onClick={() =>
                              setViewDate(
                                (d) =>
                                  new Date(d.getFullYear(), d.getMonth() + 1, 1)
                              )
                            }
                          >
                            <ChevronRightIcon
                              size={24}
                              style={{ color: vars.colors.blue80 }}
                            />
                          </button>
                        </div>
                      )}
                    </div>
                    {isExpanded ? (
                      <ScheduleCalendar
                        explicitViewDate={viewDate}
                        onChangeExplicitViewDate={setViewDate}
                        value={selectedDate}
                        onChange={handleDateChange}
                        scheduleData={[]}
                        hideHeader
                      />
                    ) : (
                      <ScheduleWeekCalendar
                        value={selectedDate}
                        onChange={handleDateChange}
                        hideHeader
                      />
                    )}
                  </div>
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
          }
        >
          <ScheduleCrewContent
            crewId={crewId}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            searchDate={searchDate}
            viewDate={viewDate}
            selectedDate={selectedDate}
            setViewDate={setViewDate}
            handleDateChange={handleDateChange}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
        </Suspense>
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
