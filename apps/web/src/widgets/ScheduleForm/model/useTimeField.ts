import { useState } from 'react';

import type { ScheduleFormValues } from './scheduleForm';
import { clampNum, parseHourWithAmPm } from '../lib/time';

interface UseTimeFieldParams {
  values: Pick<ScheduleFormValues, 'hour' | 'minute' | 'amPm'>;
  onChange: (next: Partial<ScheduleFormValues>) => void;
}

export const useTimeField = ({ values, onChange }: UseTimeFieldParams) => {
  const [hourInput, setHourInput] = useState('');
  const [minuteInput, setMinuteInput] = useState('');
  const [isHourFocused, setIsHourFocused] = useState(false);
  const [isMinuteFocused, setIsMinuteFocused] = useState(false);

  const setValues = (next: Partial<ScheduleFormValues>) => onChange(next);

  const handleAmPmChange = (amPm: ScheduleFormValues['amPm']) =>
    setValues({ amPm });

  const handleHourChange = (v: string) => {
    setHourInput(v.replace(/[^0-9]/g, ''));
  };

  const handleHourBlur = () => {
    setIsHourFocused(false);

    const raw = hourInput.trim();
    if (!raw) {
      setHourInput(
        values.hour != null ? String(values.hour).padStart(2, '0') : ''
      );
      return;
    }

    const { hour, amPm } = parseHourWithAmPm(raw, values.amPm);
    if (!hour) {
      setHourInput(
        values.hour != null ? String(values.hour).padStart(2, '0') : ''
      );
      return;
    }

    setValues({ hour, amPm });
    setHourInput(String(hour).padStart(2, '0'));
  };

  const handleHourFocus = () => {
    setIsHourFocused(true);

    if (values.hour == null) {
      setHourInput('');
      return;
    }
    setHourInput(String(values.hour));
  };

  const handleMinuteChange = (v: string) => {
    setMinuteInput(v.replace(/[^0-9]/g, ''));
  };

  const handleMinuteBlur = () => {
    setIsMinuteFocused(false);

    const raw = minuteInput.replace(/\D/g, '');
    if (!raw) {
      setMinuteInput(
        values.minute != null ? String(values.minute).padStart(2, '0') : ''
      );
      return;
    }

    let n = parseInt(raw, 10);
    if (Number.isNaN(n)) {
      setMinuteInput(
        values.minute != null ? String(values.minute).padStart(2, '0') : ''
      );
      return;
    }
    n = clampNum(n, 0, 59);

    setValues({ minute: n as any });
    setMinuteInput(String(n).padStart(2, '0'));
  };

  const handleMinuteFocus = () => {
    setIsMinuteFocused(true);

    if (values.minute == null) {
      setMinuteInput('');
      return;
    }
    setMinuteInput(String(values.minute));
  };

  const displayHour = isHourFocused
    ? hourInput
    : values.hour == null
      ? ''
      : String(values.hour).padStart(2, '0');

  const displayMinute = isMinuteFocused
    ? minuteInput
    : values.minute == null
      ? ''
      : String(values.minute).padStart(2, '0');

  return {
    amPm: values.amPm,
    hour: values.hour,
    minute: values.minute,
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
  };
};
