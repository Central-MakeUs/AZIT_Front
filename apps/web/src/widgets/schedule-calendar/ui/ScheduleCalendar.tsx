import { ChevronLeftIcon, ChevronRightIcon } from '@azit/design-system/icon';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import '@/widgets/schedule-calendar/style/ScheduleCalendarBase.css.ts';

import * as styles from '@/widgets/schedule-calendar/style/ScheduleCalendar.css.ts';

import type { ScheduleCalendarList } from '@/entities/schedule/model/schedule.types';

interface ScheduleCalendarProps {
  value: Date;
  onChange: (date: Date) => void;
  scheduleData?: ScheduleCalendarList;
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
          {dayjs(value).format('YYYY년 M월')}
        </span>
        <div className={styles.calendarButtonWrapper}>
          <button
            className={styles.calendarHeaderButton}
            onClick={handlePreviousMonth}
          >
            <ChevronLeftIcon size={24} />
          </button>
          <button
            className={styles.calendarHeaderButton}
            onClick={handleNextMonth}
          >
            <ChevronRightIcon size={24} />
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
        formatShortWeekday={(_, date) =>
          dayjs(date).format('ddd').toUpperCase()
        }
        formatDay={(_, date) => dayjs(date).format('D')}
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
