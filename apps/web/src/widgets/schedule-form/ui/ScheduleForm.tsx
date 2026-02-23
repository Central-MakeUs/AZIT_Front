import { Button } from '@azit/design-system/button';
import { MarkerPinIcon, PlusIcon, SearchIcon } from '@azit/design-system/icon';
import { Input } from '@azit/design-system/input';
import { useState } from 'react';

import { ScheduleCalendar } from '@/widgets/schedule-calendar/ui/ScheduleCalendar';
import type { ScheduleCreateFormValues } from '@/widgets/schedule-form/model/scheduleCreateForm';
import {
  TITLE_MAX_LENGTH,
  MAX_SUPPLIES,
  SUPPLY_MAX_LENGTH,
} from '@/widgets/schedule-form/model/scheduleCreateForm';
import * as styles from '@/widgets/schedule-form/styles/ScheduleCreateForm.css';
import { ChipButton } from '@/widgets/schedule-form/ui/ChipButton';

import { formatDate } from '@/shared/lib/formatters';
import { BottomSheet } from '@/shared/ui/bottom-sheet';

import { TimeField } from './TimeField';

export interface ScheduleCreateFormProps {
  formId: string;
  values: ScheduleCreateFormValues;
  onValuesChange: (values: ScheduleCreateFormValues) => void;
  onMapSearchClick?: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

function clampNum(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function parseHourWithAmPm(
  raw: string,
  prevAmPm: ScheduleCreateFormValues['amPm']
) {
  const digits = raw.replace(/\D/g, '');
  if (!digits) {
    return { hour: null as unknown as number, amPm: prevAmPm };
  }

  let n = parseInt(digits, 10);
  if (Number.isNaN(n)) {
    return { hour: null as unknown as number, amPm: prevAmPm };
  }

  let amPm = prevAmPm;

  // 13~24 → 12시간 + AM/PM 자동 변환
  if (n >= 13 && n <= 24) {
    amPm = n === 24 ? 'AM' : 'PM';
    n = n === 24 ? 12 : n - 12;
  } else if (n > 24) {
    n = clampNum(n, 1, 12);
  } else {
    // 1~12 그대로, 0 이하는 1로 클램프
    n = clampNum(n, 1, 12);
  }

  return { hour: n as unknown as number, amPm };
}

export function ScheduleForm({
  formId,
  values,
  onValuesChange,
  onMapSearchClick,
  onSubmit,
}: ScheduleCreateFormProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // 시간 입력용 로컬 문자열 상태
  const [hourInput, setHourInput] = useState('');
  const [minuteInput, setMinuteInput] = useState('');

  const setValues = (next: Partial<ScheduleCreateFormValues>) =>
    onValuesChange({ ...values, ...next });

  const handleRunTypeChange = (runType: ScheduleCreateFormValues['runType']) =>
    setValues({ runType });

  const handleAmPmChange = (amPm: ScheduleCreateFormValues['amPm']) =>
    setValues({ amPm });

  // 시간 입력 중 (포커스 상태)에는 hourInput만 업데이트, blur에서 실제 값 반영
  const handleHourChange = (v: string) => {
    setHourInput(v);
  };

  const handleHourBlur = () => {
    if (!hourInput.trim()) {
      setValues({ hour: null as any });
      setHourInput('');
      return;
    }

    const { hour, amPm } = parseHourWithAmPm(hourInput, values.amPm);
    if (!hour) {
      setValues({ hour: null as any });
      setHourInput('');
      return;
    }

    setValues({ hour, amPm });
    setHourInput(String(hour).padStart(2, '0'));
  };

  const handleHourFocus = () => {
    if (values.hour == null) {
      setHourInput('');
      return;
    }
    setHourInput(String(values.hour));
  };

  const handleMinuteChange = (v: string) => {
    setMinuteInput(v);
  };

  const handleMinuteBlur = () => {
    const raw = minuteInput.replace(/\D/g, '');
    if (!raw) {
      setValues({ minute: null as any });
      setMinuteInput('');
      return;
    }

    let n = parseInt(raw, 10);
    if (Number.isNaN(n)) {
      setValues({ minute: null as any });
      setMinuteInput('');
      return;
    }

    n = clampNum(n, 0, 59);
    setValues({ minute: n as any });
    setMinuteInput(String(n).padStart(2, '0'));
  };

  const handleMinuteFocus = () => {
    if (values.minute == null) {
      setMinuteInput('');
      return;
    }
    setMinuteInput(String(values.minute));
  };

  const addSupply = () => {
    if (values.supplies.length >= MAX_SUPPLIES) return;
    setValues({ supplies: [...values.supplies, ''] });
  };

  const updateSupply = (index: number, value: string) => {
    const next = [...values.supplies];
    next[index] = value.slice(0, SUPPLY_MAX_LENGTH);
    setValues({ supplies: next });
  };

  const dateDisplay = values.date
    ? formatDate(new Date(values.date + 'T00:00:00'), 'YYYY.MM.DD')
    : '선택하기';

  // 인풋 표시값: 포커스 없으면 values 기준 0 패딩, 포커스 있으면 로컬 입력값
  const displayHour =
    document.activeElement &&
    (document.activeElement as HTMLElement).id === 'schedule-hour'
      ? hourInput
      : values.hour == null
        ? ''
        : String(values.hour).padStart(2, '0');

  const displayMinute =
    document.activeElement &&
    (document.activeElement as HTMLElement).id === 'schedule-minute'
      ? minuteInput
      : values.minute == null
        ? ''
        : String(values.minute).padStart(2, '0');

  return (
    <form id={formId} className={styles.form} onSubmit={onSubmit}>
      <div className={styles.section}>
        <div className={styles.runTypeWrapper}>
          <label className={styles.label}>런 종류</label>
          <div className={styles.runTypeChipButton}>
            <ChipButton
              className={styles.runTypeChipButton}
              variant="primary"
              selected={values.runType === 'REGULAR'}
              onClick={() => handleRunTypeChange('REGULAR')}
            >
              정기런
            </ChipButton>
            <ChipButton
              className={styles.runTypeChipButton}
              variant="secondary"
              selected={values.runType === 'LIGHTNING'}
              onClick={() => handleRunTypeChange('LIGHTNING')}
            >
              번개런
            </ChipButton>
          </div>
        </div>
      </div>

      <div className={styles.verticalSection}>
        <label className={styles.label} htmlFor="schedule-title">
          런 타이틀
        </label>
        <div className={styles.titleInputRow}>
          <Input
            id="schedule-title"
            className={styles.inputFull}
            value={values.title}
            onChange={(e) =>
              setValues({ title: e.target.value.slice(0, TITLE_MAX_LENGTH) })
            }
            placeholder="타이틀을 입력해주세요"
            maxLength={TITLE_MAX_LENGTH}
          />
          <span className={styles.titleCounter}>
            {values.title.length}/{TITLE_MAX_LENGTH}
          </span>
        </div>
      </div>

      <div className={styles.horizontalSection}>
        <label className={styles.label}>날짜</label>
        <Button
          type="button"
          size="small"
          state={'outline'}
          onClick={() => setIsCalendarOpen(true)}
          className={styles.dateSelectButton}
        >
          {dateDisplay}
        </Button>
      </div>
      <div className={styles.horizontalSection}>
        <label className={styles.label}>시간</label>
        <TimeField
          values={{
            hour: values.hour,
            minute: values.minute,
            amPm: values.amPm,
          }}
          onChange={setValues}
        />
      </div>
      <div className={styles.verticalSection}>
        <label className={styles.label} htmlFor="schedule-location">
          집합 장소
        </label>
        <div
          id="schedule-location"
          className={styles.fakeInputContainer}
          onClick={onMapSearchClick}
        >
          <div>
            <MarkerPinIcon size={20} color="inherit" />
          </div>
          <div
            className={
              values.locationName
                ? styles.fakeInputText
                : styles.fakeInputPlaceholder
            }
          >
            {values.locationName || '장소를 지정해주세요'}
          </div>
        </div>
        <Button
          type="button"
          size="medium"
          state="outline"
          className={styles.mapSearchButton}
          onClick={onMapSearchClick}
        >
          <SearchIcon size={18} color="primary" aria-hidden />
          지도에서 찾기
        </Button>
      </div>

      <div className={styles.section}>
        <div className={styles.gridRow}>
          <div className={styles.gridCell}>
            <label className={styles.label} htmlFor="schedule-distance">
              목표 거리
            </label>
            <div className={styles.unitInputWrapper}>
              <input
                id="schedule-distance"
                type="number"
                inputMode="decimal"
                className={styles.unitInput}
                value={values.distance === 0 ? '' : values.distance}
                onChange={(e) =>
                  setValues({
                    distance: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="0"
                min={0}
                step={0.1}
              />
              <span className={styles.unitSuffix}>km</span>
            </div>
          </div>
          <div className={styles.gridCell}>
            <label className={styles.label} htmlFor="schedule-pace">
              목표 페이스
            </label>
            <div className={styles.unitInputWrapper}>
              <input
                id="schedule-pace"
                type="number"
                inputMode="decimal"
                className={styles.unitInput}
                value={values.pace === 0 ? '' : values.pace}
                onChange={(e) =>
                  setValues({
                    pace: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="0"
                min={0}
                step={0.1}
              />
              <span className={styles.unitSuffix}>/km</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.verticalSection}>
        <label className={styles.label} htmlFor="schedule-max-participants">
          최대 인원
        </label>
        <div className={styles.unitInputWrapper}>
          <input
            id="schedule-max-participants"
            type="number"
            inputMode="numeric"
            className={styles.unitInput}
            value={values.maxParticipants === 0 ? '' : values.maxParticipants}
            onChange={(e) =>
              setValues({
                maxParticipants: parseInt(e.target.value, 10) || 0,
              })
            }
            placeholder="0"
            min={0}
          />
          <span className={styles.unitSuffix}>명</span>
        </div>
      </div>

      <div className={styles.verticalSection}>
        <label className={styles.label} htmlFor="schedule-description">
          상세 설명
        </label>
        <textarea
          id="schedule-description"
          className={styles.textarea}
          value={values.description}
          onChange={(e) => setValues({ description: e.target.value })}
          placeholder="상세 설명을 입력해주세요"
        />
      </div>

      <div className={styles.verticalSection}>
        <label className={styles.label} htmlFor="schedule-supply-0">
          준비물
        </label>
        {values.supplies.map((supply, index) => (
          <Input
            key={index}
            id={index === 0 ? 'schedule-supply-0' : undefined}
            className={styles.inputFull}
            value={supply}
            onChange={(e) => updateSupply(index, e.target.value)}
            placeholder="준비물을 입력하세요"
            maxLength={SUPPLY_MAX_LENGTH}
          />
        ))}
        {values.supplies.length < MAX_SUPPLIES && (
          <button
            type="button"
            className={styles.addSupplyButton}
            onClick={addSupply}
          >
            <PlusIcon size={18} color="primary" aria-hidden />
            준비물 추가하기
          </button>
        )}
      </div>

      <BottomSheet
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onOutsideClick={() => setIsCalendarOpen(false)}
        contentClassName={styles.bottomSheetContent}
      >
        <ScheduleCalendar
          value={values.date ? new Date(values.date + 'T00:00:00') : new Date()}
          onChange={(date) => {
            setValues({ date: formatDate(date, 'YYYY-MM-DD') });
            setIsCalendarOpen(false);
          }}
        />
      </BottomSheet>
    </form>
  );
}
