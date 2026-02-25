import { Button } from '@azit/design-system/button';
import {
  MapIcon,
  MarkerPinIcon,
  PlusIcon,
  TrashIcon,
} from '@azit/design-system/icon';
import { Input } from '@azit/design-system/input';
import { useState } from 'react';

import { ScheduleCalendar } from '@/widgets/schedule-calendar/ui/ScheduleCalendar';
import type { ScheduleFormValues } from '@/widgets/schedule-form/model/scheduleForm';
import {
  TITLE_MAX_LENGTH,
  MAX_SUPPLIES,
  SUPPLY_MAX_LENGTH,
  DISTANCE_MAX,
  PACE_MAX,
  PARTICIPANTS_MAX,
} from '@/widgets/schedule-form/model/scheduleForm';
import * as styles from '@/widgets/schedule-form/styles/ScheduleForm.css';
import { ChipButton } from '@/widgets/schedule-form/ui/ChipButton';

import { formatDate } from '@/shared/lib/formatters';
import { BottomSheet } from '@/shared/ui/bottom-sheet';

import { TimeField } from './TimeField';

export interface ScheduleFormProps {
  formId: string;
  values: ScheduleFormValues;
  onValuesChange: (values: ScheduleFormValues) => void;
  onMapSearchClick?: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLeader?: boolean;
}

export function ScheduleForm({
  formId,
  values,
  onValuesChange,
  onMapSearchClick,
  onSubmit,
  isLeader = true,
}: ScheduleFormProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [distanceError, setDistanceError] = useState(false);
  const [paceError, setPaceError] = useState(false);
  const [participantsError, setParticipantsError] = useState(false);

  const setValues = (next: Partial<ScheduleFormValues>) =>
    onValuesChange({ ...values, ...next });

  const handleRunTypeChange = (runType: ScheduleFormValues['runType']) =>
    setValues({ runType });

  const addSupply = () => {
    if (values.supplies.length >= MAX_SUPPLIES) return;
    setValues({ supplies: [...values.supplies, ''] });
  };

  const updateSupply = (index: number, value: string) => {
    const next = [...values.supplies];
    next[index] = value.slice(0, SUPPLY_MAX_LENGTH);
    setValues({ supplies: next });
  };

  const removeSupply = (index: number) => {
    setValues({ supplies: values.supplies.filter((_, i) => i !== index) });
  };

  const dateDisplay = values.date
    ? formatDate(new Date(values.date + 'T00:00:00'), 'YYYY.MM.DD')
    : '선택하기';

  return (
    <form
      id={formId}
      className={styles.form}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <div className={styles.topGroup}>
        <div className={styles.section}>
          <div className={styles.runTypeWrapper}>
            <label className={styles.label}>런 종류</label>
            <div className={styles.runTypeChipButton}>
              {isLeader && (
                <ChipButton
                  className={styles.runTypeChipButton}
                  variant="primary"
                  selected={values.runType === 'REGULAR'}
                  onClick={() => handleRunTypeChange('REGULAR')}
                >
                  정기런
                </ChipButton>
              )}
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
          <div className={styles.titleInputWrapper}>
            <input
              id="schedule-title"
              className={styles.titleInput}
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
      </div>

      <div className={styles.dateTimeGroup}>
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
      </div>

      <div className={styles.verticalSection}>
        <label className={styles.label} htmlFor="schedule-location">
          집합 장소
        </label>
        <div id="schedule-location" className={styles.fakeInputContainer}>
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
            {values.locationName && values.detailedLocation
              ? `${values.locationName} ${values.detailedLocation}`
              : '장소를 지정해주세요'}
          </div>
        </div>
        <button
          type="button"
          className={styles.mapSearchButton}
          onClick={onMapSearchClick}
        >
          <MapIcon size={20} color="primary" aria-hidden />
          지도에서 찾기
        </button>
      </div>

      <div className={styles.bottomGroup}>
        <div className={styles.section}>
          <div className={styles.gridRow}>
            <div className={styles.gridCell}>
              <label className={styles.label} htmlFor="schedule-distance">
                목표 거리
              </label>
              <div className={styles.unitInputFieldWrapper}>
                <div
                  className={
                    distanceError
                      ? styles.unitInputWrapperError
                      : styles.unitInputWrapper
                  }
                >
                  <input
                    id="schedule-distance"
                    type="text"
                    inputMode="numeric"
                    className={styles.unitInput}
                    value={values.distance ?? ''}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      const n = parseInt(raw, 10);
                      const value = raw === '' || Number.isNaN(n) ? null : n;
                      setDistanceError(value !== null && value > DISTANCE_MAX);
                      setValues({ distance: value });
                    }}
                    placeholder="0"
                  />
                  <span className={styles.unitSuffix}>km</span>
                </div>
                {distanceError && (
                  <p className={styles.unitInputErrorMessage}>
                    최대 값 : {DISTANCE_MAX}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.gridCell}>
              <label className={styles.label} htmlFor="schedule-pace">
                목표 페이스
              </label>
              <div className={styles.unitInputFieldWrapper}>
                <div
                  className={
                    paceError
                      ? styles.unitInputWrapperError
                      : styles.unitInputWrapper
                  }
                >
                  <input
                    id="schedule-pace"
                    type="text"
                    inputMode="numeric"
                    className={styles.unitInput}
                    value={values.pace ?? ''}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      const n = parseInt(raw, 10);
                      const value = raw === '' || Number.isNaN(n) ? null : n;
                      setPaceError(value !== null && value > PACE_MAX);
                      setValues({ pace: value });
                    }}
                    placeholder="0"
                  />
                  <span className={styles.unitSuffix}>분/km</span>
                </div>
                {paceError && (
                  <p className={styles.unitInputErrorMessage}>
                    최대 값 : {PACE_MAX}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.verticalSection}>
          <label className={styles.label} htmlFor="schedule-max-participants">
            최대 인원
          </label>
          <div className={styles.unitInputFieldWrapper}>
            <div
              className={
                participantsError
                  ? styles.unitInputWrapperError
                  : styles.unitInputWrapper
              }
            >
              <input
                id="schedule-max-participants"
                type="text"
                inputMode="numeric"
                className={styles.unitInput}
                value={values.maxParticipants ?? ''}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, '');
                  const n = parseInt(raw, 10);
                  const value = raw === '' || Number.isNaN(n) ? null : n;
                  setParticipantsError(
                    value !== null && value > PARTICIPANTS_MAX
                  );
                  setValues({ maxParticipants: value });
                }}
                placeholder="0"
              />
              <span className={styles.unitSuffix}>명</span>
            </div>
            {participantsError && (
              <p className={styles.unitInputErrorMessage}>
                최대 값 : {PARTICIPANTS_MAX}
              </p>
            )}
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
            <div key={index} className={styles.supplyRow}>
              <Input
                className={styles.inputFull}
                value={supply}
                onChange={(e) => updateSupply(index, e.target.value)}
                placeholder="준비물을 입력하세요"
                maxLength={SUPPLY_MAX_LENGTH}
              />
              {index > 0 && (
                <button
                  type="button"
                  className={styles.supplyDeleteButton}
                  onClick={() => removeSupply(index)}
                  aria-label="준비물 삭제"
                >
                  <TrashIcon size={24} color="primary" />
                </button>
              )}
            </div>
          ))}
          {values.supplies.length < MAX_SUPPLIES && (
            <button
              type="button"
              className={styles.addSupplyButton}
              onClick={addSupply}
            >
              <PlusIcon size={16} color="primary" aria-hidden />
              준비물 추가하기
            </button>
          )}
        </div>
      </div>

      <BottomSheet
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onOutsideClick={() => setIsCalendarOpen(false)}
        contentClassName={styles.bottomSheetContent}
      >
        <ScheduleCalendar
          isPastDateDisabled
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
