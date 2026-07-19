import dayjs from 'dayjs';

import { formatDate } from '@/shared/lib/formatters';
import type { ScheduleCalendarItem } from '@/shared/types/schedule';
import * as calendarStyles from '@/shared/ui/calendar/style/ScheduleCalendar.css.ts';
import * as styles from '@/shared/ui/calendar/style/ScheduleWeekCalendar.css.ts';

const WEEKDAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

interface ScheduleWeekCalendarProps {
  value: Date;
  onChange: (date: Date) => void;
  scheduleData?: ScheduleCalendarItem[];
  hideHeader?: boolean;
}

export function ScheduleWeekCalendar({
  value,
  onChange,
  scheduleData,
  hideHeader = false,
}: ScheduleWeekCalendarProps) {
  const selected = dayjs(value);
  const weekStart = selected.startOf('week');
  const days = Array.from({ length: 7 }, (_, i) => weekStart.add(i, 'day'));

  return (
    <div className={styles.calendarContainer}>
      {!hideHeader && (
        <div className={styles.calendarHeaderSection}>
          <span className={styles.calendarTitle}>
            {formatDate(weekStart.toDate(), 'YYYY년 M월')}
          </span>
        </div>
      )}
      <div className={styles.weekRow}>
        {days.map((day, i) => {
          const isSelected = selected.isSame(day, 'day');
          const schedule = scheduleData?.find((s) =>
            dayjs(s.date).isSame(day, 'day')
          );
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(day.toDate())}
              className={[
                styles.dayCell,
                isSelected ? styles.dayCellSelected : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className={styles.weekdayLabel}>{WEEKDAY_LABELS[i]}</span>
              <span className={styles.dayNumber}>{day.format('D')}</span>
              <div className={styles.dotRow}>
                {schedule?.hasRegular && (
                  <div className={calendarStyles.regularTile} />
                )}
                {schedule?.hasLightning && (
                  <div className={calendarStyles.lightningTile} />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
