import { Input } from '@azit/design-system/input';

import type { ScheduleFormValues } from '../model/scheduleForm';
import { useTimeField } from '../model/useTimeField';
import * as styles from '../styles/TimeField.css';
import { ChipButton } from '../ui/ChipButton';

interface TimeFieldProps {
  values: Pick<ScheduleFormValues, 'hour' | 'minute' | 'amPm'>;
  onChange: (next: Partial<ScheduleFormValues>) => void;
}

export function TimeField({ values, onChange }: TimeFieldProps) {
  const {
    amPm,
    hourInput,
    minuteInput,
    displayHour,
    displayMinute,
    handleAmPmChange,
    handleHourChange,
    handleHourBlur,
    handleHourFocus,
    handleMinuteChange,
    handleMinuteBlur,
    handleMinuteFocus,
  } = useTimeField({ values, onChange });

  return (
    <div className={styles.timeRow}>
      <div className={styles.amPmRow}>
        <ChipButton
          variant="primary"
          selected={amPm === 'AM'}
          onClick={() => handleAmPmChange('AM')}
        >
          오전
        </ChipButton>
        <ChipButton
          variant="primary"
          selected={amPm === 'PM'}
          onClick={() => handleAmPmChange('PM')}
        >
          오후
        </ChipButton>
      </div>
      <div className={styles.timeInputsRow}>
        <Input
          id="schedule-hour"
          inputMode="numeric"
          className={styles.timeInput}
          value={hourInput || displayHour}
          onFocus={handleHourFocus}
          onBlur={handleHourBlur}
          onChange={(e) => handleHourChange(e.target.value)}
          placeholder="09"
          maxLength={2}
        />
        <span className={styles.timeColon}>:</span>
        <Input
          id="schedule-minute"
          inputMode="numeric"
          className={styles.timeInput}
          value={minuteInput || displayMinute}
          onFocus={handleMinuteFocus}
          onBlur={handleMinuteBlur}
          onChange={(e) => handleMinuteChange(e.target.value)}
          placeholder="30"
          maxLength={2}
        />
      </div>
    </div>
  );
}
