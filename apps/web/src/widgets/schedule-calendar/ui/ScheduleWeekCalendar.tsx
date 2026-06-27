import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

import * as styles from '@/widgets/schedule-calendar/style/ScheduleWeekCalendar.css.ts';

import { formatDate } from '@/shared/lib/formatters';
import type { ScheduleCalendarItem } from '@/shared/types/schedule';

interface ScheduleWeekCalendarProps {
  value: Date;
  onChange: (date: Date) => void;
  onViewWeekChange?: (date: Date) => void;
  scheduleData?: ScheduleCalendarItem[];
}

const WEEKDAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function WeekSlot({
  weekStart,
  value,
  onChange,
  scheduleData,
}: {
  weekStart: Date;
  value: Date;
  onChange: (date: Date) => void;
  scheduleData?: ScheduleCalendarItem[];
}) {
  const days = Array.from({ length: 7 }, (_, i) =>
    dayjs(weekStart).startOf('week').add(i, 'day')
  );

  return (
    <div className={styles.daysRow}>
      {days.map((day, i) => {
        const isSelected = day.isSame(dayjs(value), 'day');
        const schedule = scheduleData?.find((item) =>
          dayjs(item.date).isSame(day, 'day')
        );
        return (
          <div
            key={day.format('YYYY-MM-DD')}
            className={`${styles.dayColumn} ${isSelected ? styles.dayColumnSelected : ''}`}
          >
            <span
              className={`${styles.weekdayLabel} ${isSelected ? styles.weekdayLabelSelected : ''}`}
            >
              {WEEKDAY_LABELS[i]}
            </span>
            <button
              type="button"
              className={styles.dayTile}
              onClick={() => onChange(day.toDate())}
            >
              {day.format('D')}
              <div className={styles.dotContainer}>
                {schedule?.hasRegular && <div className={styles.dotRegular} />}
                {schedule?.hasLightning && (
                  <div className={styles.dotLightning} />
                )}
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function ScheduleWeekCalendar({
  value,
  onChange,
  onViewWeekChange,
  scheduleData,
}: ScheduleWeekCalendarProps) {
  const [viewWeekStart, setViewWeekStart] = useState(
    dayjs(value).startOf('week').toDate()
  );

  const currentWeekStart = viewWeekStart;
  const prevWeekStart = dayjs(viewWeekStart).subtract(7, 'day').toDate();
  const nextWeekStart = dayjs(viewWeekStart).add(7, 'day').toDate();

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [withTransition, setWithTransition] = useState(false);
  const isAnimating = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const block = (e: TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const diffX = Math.abs(e.touches[0].clientX - touchStartX.current);
      const diffY = Math.abs(e.touches[0].clientY - touchStartY.current);
      if (diffX > diffY) e.preventDefault();
    };
    el.addEventListener('touchmove', block, { passive: false });
    return () => el.removeEventListener('touchmove', block);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating.current) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.touches[0].clientX - touchStartX.current;
    const diffY = Math.abs(e.touches[0].clientY - touchStartY.current);
    if (Math.abs(diffX) > diffY) {
      setDragOffset(diffX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(diff) < 50) {
      setWithTransition(true);
      setDragOffset(0);
      return;
    }

    const direction = diff > 0 ? 1 : -1;
    const containerWidth =
      containerRef.current?.offsetWidth ?? window.innerWidth;

    isAnimating.current = true;
    setWithTransition(true);
    setDragOffset(-direction * containerWidth);

    setTimeout(() => {
      const nextWeek = dayjs(viewWeekStart)
        .add(direction * 7, 'day')
        .toDate();
      setViewWeekStart(nextWeek);
      onViewWeekChange?.(nextWeek);
      setWithTransition(false);
      setDragOffset(0);
      requestAnimationFrame(() => {
        isAnimating.current = false;
      });
    }, 250);
  };

  const trackTranslateX = `calc(-33.333% + ${dragOffset}px)`;

  return (
    <div
      ref={containerRef}
      className={styles.calendarContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.calendarHeaderSection}>
        <span className={styles.calendarTitle}>
          {formatDate(currentWeekStart, 'YYYY년 M월')}
        </span>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            width: '300%',
            transform: `translateX(${trackTranslateX})`,
            transition: withTransition ? 'transform 0.25s ease' : 'none',
          }}
        >
          {[prevWeekStart, currentWeekStart, nextWeekStart].map((weekStart) => (
            <div
              key={dayjs(weekStart).format('YYYY-MM-DD')}
              style={{ width: '33.333%' }}
            >
              <WeekSlot
                weekStart={weekStart}
                value={value}
                onChange={onChange}
                scheduleData={scheduleData}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
