import { useCallback, useRef, useState } from 'react';

import { formatDate } from '@/shared/lib/formatters';

import type { ScheduleFormValues } from './scheduleForm';
import {
  DISTANCE_MAX,
  MAX_SUPPLIES,
  PACE_MAX,
  PARTICIPANTS_MAX,
  SUPPLY_MAX_LENGTH,
  TITLE_MAX_LENGTH,
} from './scheduleForm';

export function useScheduleForm(
  values: ScheduleFormValues,
  onValuesChange: (values: ScheduleFormValues) => void
) {
  // 최신 values/onValuesChange를 ref로 유지해 setValues를 안정적으로 만듦
  const valuesRef = useRef(values);
  valuesRef.current = values;
  const onValuesChangeRef = useRef(onValuesChange);
  onValuesChangeRef.current = onValuesChange;

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [pendingAmPm, setPendingAmPm] = useState<'AM' | 'PM'>('AM');
  const [pendingHour, setPendingHour] = useState<number>(1);
  const [pendingMinute, setPendingMinute] = useState<number>(0);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [distanceError, setDistanceError] = useState(false);
  const [paceError, setPaceError] = useState(false);
  const [participantsError, setParticipantsError] = useState(false);

  // ref 기반으로 안정적인 setValues
  const setValues = useCallback((next: Partial<ScheduleFormValues>) => {
    onValuesChangeRef.current({ ...valuesRef.current, ...next });
  }, []);

  const toggleSection = useCallback((key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
  }, []);

  // 섹션별 안정적인 토글 (각 섹션 컴포넌트의 onToggle prop으로 전달)
  const toggleDatetime = useCallback(
    () => toggleSection('datetime'),
    [toggleSection]
  );
  const toggleLocation = useCallback(
    () => toggleSection('location'),
    [toggleSection]
  );
  const toggleGoal = useCallback(() => toggleSection('goal'), [toggleSection]);
  const toggleParticipants = useCallback(
    () => toggleSection('participants'),
    [toggleSection]
  );
  const toggleDetail = useCallback(
    () => toggleSection('detail'),
    [toggleSection]
  );

  const handleRunTypeChange = useCallback(
    (runType: ScheduleFormValues['runType']) => setValues({ runType }),
    [setValues]
  );

  const handleTitleChange = useCallback(
    (value: string) => setValues({ title: value.slice(0, TITLE_MAX_LENGTH) }),
    [setValues]
  );

  const addSupply = useCallback(() => {
    const supplies = valuesRef.current.supplies;
    if (supplies.length >= MAX_SUPPLIES) return;
    if (supplies[supplies.length - 1] === '') return;
    setValues({ supplies: [...supplies, ''] });
  }, [setValues]);

  const updateSupply = useCallback(
    (index: number, value: string) => {
      const next = [...valuesRef.current.supplies];
      next[index] = value.slice(0, SUPPLY_MAX_LENGTH);
      setValues({ supplies: next });
    },
    [setValues]
  );

  const removeSupply = useCallback(
    (index: number) => {
      setValues({
        supplies: valuesRef.current.supplies.filter((_, i) => i !== index),
      });
    },
    [setValues]
  );

  const handleCalendarOpen = useCallback(() => setIsCalendarOpen(true), []);

  const handleCalendarClose = useCallback(() => setIsCalendarOpen(false), []);

  const handleDateChange = useCallback((date: Date) => {
    onValuesChangeRef.current({
      ...valuesRef.current,
      date: formatDate(date, 'YYYY-MM-DD'),
    });
    setIsCalendarOpen(false);
  }, []);

  const openTimePicker = useCallback(() => {
    setPendingAmPm(valuesRef.current.amPm);
    setPendingHour(valuesRef.current.hour ?? 1);
    setPendingMinute(valuesRef.current.minute ?? 0);
    setIsTimePickerOpen(true);
  }, []);

  const handleTimePickerClose = useCallback(
    () => setIsTimePickerOpen(false),
    []
  );

  const handleTimeConfirm = useCallback(
    (amPm: 'AM' | 'PM', hour: number, minute: number) => {
      setValues({ amPm, hour, minute });
      setIsTimePickerOpen(false);
    },
    [setValues]
  );

  const handleDescriptionChange = useCallback(
    (value: string) => setValues({ description: value }),
    [setValues]
  );

  const handleDistanceChange = useCallback(
    (raw: string) => {
      const cleaned = raw.replace(/[^0-9]/g, '');
      const n = parseInt(cleaned, 10);
      const value = cleaned === '' || Number.isNaN(n) ? null : n;
      setDistanceError(value !== null && value > DISTANCE_MAX);
      setValues({ distance: value });
    },
    [setValues]
  );

  const handlePaceChange = useCallback(
    (raw: string) => {
      const cleaned = raw.replace(/[^0-9]/g, '');
      const n = parseInt(cleaned, 10);
      const value = cleaned === '' || Number.isNaN(n) ? null : n;
      setPaceError(value !== null && value > PACE_MAX);
      setValues({ pace: value });
    },
    [setValues]
  );

  const handleParticipantsChange = useCallback(
    (raw: string) => {
      const cleaned = raw.replace(/[^0-9]/g, '');
      const n = parseInt(cleaned, 10);
      const value = cleaned === '' || Number.isNaN(n) ? null : n;
      setParticipantsError(value !== null && value > PARTICIPANTS_MAX);
      setValues({ maxParticipants: value });
    },
    [setValues]
  );

  const dateDisplay = values.date
    ? formatDate(new Date(values.date + 'T00:00:00'), 'YYYY.MM.DD')
    : null;

  const timeDisplay =
    values.hour !== null
      ? `${values.amPm === 'AM' ? '오전' : '오후'} ${String(values.hour).padStart(2, '0')}:${String(values.minute ?? 0).padStart(2, '0')}`
      : null;

  const isDateTimeFilled =
    !!values.date && values.hour !== null && values.minute !== null;
  const isLocationFilled =
    !!values.locationName && !!values.address && !!values.detailedLocation;
  const isGoalFilled =
    values.distance !== null &&
    values.distance >= 1 &&
    values.pace !== null &&
    values.pace >= 1;
  const isParticipantsFilled =
    values.maxParticipants !== null && values.maxParticipants >= 1;
  const isDetailFilled = values.description.trim().length >= 1;

  return {
    // 바텀시트 상태
    isCalendarOpen,
    isTimePickerOpen,
    handleCalendarOpen,
    handleCalendarClose,
    handleTimePickerClose,
    // 아코디언
    openSection,
    toggleDatetime,
    toggleLocation,
    toggleGoal,
    toggleParticipants,
    toggleDetail,
    // 유효성 에러
    distanceError,
    paceError,
    participantsError,
    // 시간 피커 pending
    pendingAmPm,
    setPendingAmPm,
    pendingHour,
    setPendingHour,
    pendingMinute,
    setPendingMinute,
    // 핸들러
    setValues,
    handleRunTypeChange,
    handleTitleChange,
    addSupply,
    updateSupply,
    removeSupply,
    openTimePicker,
    handleTimeConfirm,
    handleDateChange,
    handleDescriptionChange,
    handleDistanceChange,
    handlePaceChange,
    handleParticipantsChange,
    // 표시값
    dateDisplay,
    timeDisplay,
    // 섹션 완료 여부
    isDateTimeFilled,
    isLocationFilled,
    isGoalFilled,
    isParticipantsFilled,
    isDetailFilled,
  };
}
