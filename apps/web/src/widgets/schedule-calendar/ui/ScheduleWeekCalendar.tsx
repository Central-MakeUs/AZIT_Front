import dayjs from 'dayjs';
import Calendar from 'react-calendar';

import '@/widgets/schedule-calendar/style/ScheduleCalendarBase.css.ts';
import * as styles from '@/widgets/schedule-calendar/style/ScheduleWeekCalendar.css.ts';

import { formatDate } from '@/shared/lib/formatters';

interface ScheduleWeekCalendarProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function ScheduleWeekCalendar({
  value,
  onChange,
}: ScheduleWeekCalendarProps) {
  const activeStartDate = dayjs(value).startOf('week').toDate();
  const startOfWeek = dayjs(value).startOf('week').toDate();
  const endOfWeek = dayjs(value).endOf('week').toDate();

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeaderSection}>
        <span className={styles.calendarTitle}>
          {formatDate(activeStartDate, 'YYYY년 M월')}
        </span>
      </div>

      <Calendar
        value={value}
        onChange={(date) => {
          if (date instanceof Date) onChange(date);
        }}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate: nextStart }) => {
          if (nextStart) onChange(nextStart);
        }}
        formatShortWeekday={(_, date) => formatDate(date, 'ddd').toUpperCase()}
        formatDay={(_, date) => formatDate(date, 'D')}
        tileDisabled={({ date }) => date < startOfWeek || date > endOfWeek}
      />
    </div>
  );
}
