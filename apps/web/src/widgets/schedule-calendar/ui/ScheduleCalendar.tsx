import { ChevronLeftIcon, ChevronRightIcon } from '@azit/design-system/icon';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import '@/widgets/schedule-calendar/style/ScheduleCalendarBase.css.ts';

import * as styles from '@/widgets/schedule-calendar/style/ScheduleCalendar.css.ts';

import { formatDate } from '@/shared/lib/formatters';
import type { ScheduleCalendarItem } from '@/shared/types/schedule';

import { vars } from '@azit/design-system';

interface ScheduleCalendarProps {
  value: Date;
  onChange: (date: Date) => void;
  scheduleData?: ScheduleCalendarItem[];
}

export function ScheduleCalendar({
  value,
  onChange,
  scheduleData,
}: ScheduleCalendarProps) {
  const handlePreviousMonth = () => {
    onChange(dayjs(value).subtract(1, 'month').toDate());
  };
  const handleNextMonth = () => {
    onChange(dayjs(value).add(1, 'month').toDate());
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
          >
            <ChevronLeftIcon size={24} style={{ color: vars.colors.blue80 }} />
          </button>
          <button
            className={styles.calendarHeaderButton}
            onClick={handleNextMonth}
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
