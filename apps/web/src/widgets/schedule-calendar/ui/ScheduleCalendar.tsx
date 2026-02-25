import { vars } from '@azit/design-system';
import { ChevronLeftIcon, ChevronRightIcon } from '@azit/design-system/icon';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import '@/widgets/schedule-calendar/style/ScheduleCalendarBase.css.ts';

import * as styles from '@/widgets/schedule-calendar/style/ScheduleCalendar.css.ts';

import { formatDate } from '@/shared/lib/formatters';
import type { ScheduleCalendarItem } from '@/shared/types/schedule';

interface ScheduleCalendarProps {
  value: Date;
  onChange: (date: Date) => void;
  scheduleData?: ScheduleCalendarItem[];
  isPastDateDisabled?: boolean;
  onMonthChange?: (date: Date) => void;
}

export function ScheduleCalendar({
  value,
  onChange,
  scheduleData,
  isPastDateDisabled = false,
  onMonthChange,
}: ScheduleCalendarProps) {
  const handlePreviousMonth = () => {
    onMonthChange?.(dayjs(value).subtract(1, 'month').toDate());
  };
  const handleNextMonth = () => {
    onMonthChange?.(dayjs(value).add(1, 'month').toDate());
  };

  const activeStartDate = dayjs(value).startOf('month').toDate();

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeaderSection}>
        <span className={styles.calendarTitle}>
          {formatDate(value, 'YYYY년 M월')}
        </span>
        <div className={styles.calendarButtonWrapper}>
          <button
            className={styles.calendarHeaderButton}
            onClick={handlePreviousMonth}
            type="button"
          >
            <ChevronLeftIcon size={24} style={{ color: vars.colors.blue80 }} />
          </button>
          <button
            className={styles.calendarHeaderButton}
            onClick={handleNextMonth}
            type="button"
          >
            <ChevronRightIcon size={24} style={{ color: vars.colors.blue80 }} />
          </button>
        </div>
      </div>

      <Calendar
        value={value}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate: nextStart }) => {
          if (nextStart) onChange(nextStart);
        }}
        onChange={(value) => {
          if (value instanceof Date) onChange(value);
        }}
        formatShortWeekday={(_, date) => formatDate(date, 'ddd').toUpperCase()}
        formatDay={(_, date) => formatDate(date, 'D')}
        tileClassName={({ date }) => {
          if (dayjs(date).isBefore(dayjs().startOf('day'))) {
            return isPastDateDisabled ? styles.pastDateTile : '';
          }
          return '';
        }}
        tileDisabled={({ date }) => {
          if (isPastDateDisabled) {
            return dayjs(date).isBefore(dayjs().startOf('day'));
          }
          return false;
        }}
        tileContent={({ date }: { date: Date }) => {
          const schedule = scheduleData?.find((item) =>
            dayjs(item.date).isSame(date, 'day')
          );
          const hasLightning = schedule?.hasLightning;
          const hasRegular = schedule?.hasRegular;
          return (
            <div className={styles.tileContainer}>
              {hasRegular && <div className={styles.regularTile} />}
              {hasLightning && <div className={styles.lightningTile} />}
            </div>
          );
        }}
      />
    </div>
  );
}
