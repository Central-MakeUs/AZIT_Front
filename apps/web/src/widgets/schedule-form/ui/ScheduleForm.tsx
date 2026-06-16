import { Button } from '@azit/design-system/button';
import { WheelPicker } from '@azit/design-system/wheel-picker';

import { ScheduleCalendar } from '@/widgets/schedule-calendar/ui/ScheduleCalendar';
import type { ScheduleFormValues } from '@/widgets/schedule-form/model/scheduleForm';
import { useScheduleForm } from '@/widgets/schedule-form/model/useScheduleForm';
import * as styles from '@/widgets/schedule-form/styles/ScheduleForm.css';
import { ScheduleFormDateTimeSection } from '@/widgets/schedule-form/ui/ScheduleFormDateTimeSection';
import { ScheduleFormDetailSection } from '@/widgets/schedule-form/ui/ScheduleFormDetailSection';
import { ScheduleFormGoalSection } from '@/widgets/schedule-form/ui/ScheduleFormGoalSection';
import { ScheduleFormLocationSection } from '@/widgets/schedule-form/ui/ScheduleFormLocationSection';
import { ScheduleFormParticipantsSection } from '@/widgets/schedule-form/ui/ScheduleFormParticipantsSection';
import { ScheduleFormTopSection } from '@/widgets/schedule-form/ui/ScheduleFormTopSection';

import { BottomSheet } from '@/shared/ui/bottom-sheet';

const amPmItems = [
  { label: '오전', value: 'AM' },
  { label: '오후', value: 'PM' },
];

const hourItems = Array.from({ length: 12 }, (_, i) => ({
  label: String(i + 1).padStart(2, '0'),
  value: i + 1,
}));

const minuteItems = Array.from({ length: 60 }, (_, i) => ({
  label: String(i).padStart(2, '0'),
  value: i,
}));

const paceMinItems = Array.from({ length: 20 }, (_, i) => ({
  label: String(i + 1),
  value: i + 1,
}));

const paceSecItems = [0, 10, 20, 30, 40, 50].map((s) => ({
  label: String(s).padStart(2, '0'),
  value: s,
}));

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
  const {
    isCalendarOpen,
    isTimePickerOpen,
    isPacePickerOpen,
    handleCalendarOpen,
    handleCalendarClose,
    handleTimePickerClose,
    openPacePicker,
    handlePacePickerClose,
    handlePaceConfirm,
    pendingPaceMin,
    setPendingPaceMin,
    pendingPaceSec,
    setPendingPaceSec,
    openSection,
    toggleDatetime,
    toggleLocation,
    toggleGoal,
    toggleParticipants,
    toggleDetail,
    distanceError,
    paceError,
    participantsError,
    pendingAmPm,
    setPendingAmPm,
    pendingHour,
    setPendingHour,
    pendingMinute,
    setPendingMinute,
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
    handleParticipantsChange,
    dateDisplay,
    timeDisplay,
    isDateTimeFilled,
    isLocationFilled,
    isGoalFilled,
    isParticipantsFilled,
    isDetailFilled,
  } = useScheduleForm(values, onValuesChange);

  return (
    <form
      id={formId}
      className={styles.form}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <ScheduleFormTopSection
        isLeader={isLeader}
        runType={values.runType}
        title={values.title}
        onRunTypeChange={handleRunTypeChange}
        onTitleChange={handleTitleChange}
      />

      <div className={styles.accordionGroup}>
        <ScheduleFormDateTimeSection
          dateDisplay={dateDisplay}
          timeDisplay={timeDisplay}
          isDateTimeFilled={isDateTimeFilled}
          open={openSection === 'datetime'}
          onToggle={toggleDatetime}
          onDateClick={handleCalendarOpen}
          onTimeClick={openTimePicker}
        />

        <div className={styles.accordionDivider} />

        <ScheduleFormLocationSection
          locationName={values.locationName}
          detailedLocation={values.detailedLocation}
          isLocationFilled={isLocationFilled}
          open={openSection === 'location'}
          onToggle={toggleLocation}
          onMapSearchClick={onMapSearchClick}
        />

        <div className={styles.accordionDivider} />

        <ScheduleFormGoalSection
          distance={values.distance}
          pace={values.pace}
          distanceError={distanceError}
          paceError={paceError}
          isGoalFilled={isGoalFilled}
          open={openSection === 'goal'}
          onToggle={toggleGoal}
          onDistanceChange={handleDistanceChange}
          onPaceClick={openPacePicker}
        />

        <div className={styles.accordionDivider} />

        <ScheduleFormParticipantsSection
          maxParticipants={values.maxParticipants}
          participantsError={participantsError}
          isParticipantsFilled={isParticipantsFilled}
          open={openSection === 'participants'}
          onToggle={toggleParticipants}
          onParticipantsChange={handleParticipantsChange}
        />

        <div className={styles.accordionDivider} />

        <ScheduleFormDetailSection
          description={values.description}
          supplies={values.supplies}
          isDetailFilled={isDetailFilled}
          open={openSection === 'detail'}
          onToggle={toggleDetail}
          onDescriptionChange={handleDescriptionChange}
          onAddSupply={addSupply}
          onUpdateSupply={updateSupply}
          onRemoveSupply={removeSupply}
        />
      </div>

      <BottomSheet
        isOpen={isCalendarOpen}
        onClose={handleCalendarClose}
        onOutsideClick={handleCalendarClose}
        contentClassName={styles.bottomSheetContent}
      >
        <ScheduleCalendar
          isPastDateDisabled
          value={values.date ? new Date(values.date + 'T00:00:00') : new Date()}
          onChange={handleDateChange}
        />
      </BottomSheet>

      <BottomSheet
        isOpen={isPacePickerOpen}
        onClose={handlePacePickerClose}
        onOutsideClick={handlePacePickerClose}
      >
        <div className={styles.pacePickerRow}>
          <div className={styles.pacePickerColumn}>
            <WheelPicker
              items={paceMinItems}
              value={pendingPaceMin}
              onChange={(v) => setPendingPaceMin(v as number)}
            />
          </div>
          <div className={styles.pacePickerColumn}>
            <WheelPicker
              items={paceSecItems}
              value={pendingPaceSec}
              onChange={(v) => setPendingPaceSec(v as number)}
            />
          </div>
        </div>
        <div className={styles.timePickerFooter}>
          <Button
            type="button"
            size="large"
            state="active"
            onClick={() => handlePaceConfirm(pendingPaceMin, pendingPaceSec)}
          >
            다음
          </Button>
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={isTimePickerOpen}
        onClose={handleTimePickerClose}
        onOutsideClick={handleTimePickerClose}
      >
        <div className={styles.timePickerRow}>
          <div className={styles.timePickerColumn}>
            <WheelPicker
              items={amPmItems}
              value={pendingAmPm}
              onChange={(v) => setPendingAmPm(v as 'AM' | 'PM')}
            />
          </div>
          <div className={styles.timePickerColumn}>
            <WheelPicker
              items={hourItems}
              value={pendingHour}
              onChange={(v) => setPendingHour(v as number)}
            />
          </div>
          <div className={styles.timePickerColumn}>
            <WheelPicker
              items={minuteItems}
              value={pendingMinute}
              onChange={(v) => setPendingMinute(v as number)}
            />
          </div>
        </div>
        <div className={styles.timePickerFooter}>
          <Button
            type="button"
            size="large"
            state="active"
            onClick={() =>
              handleTimeConfirm(pendingAmPm, pendingHour, pendingMinute)
            }
          >
            다음
          </Button>
        </div>
      </BottomSheet>
    </form>
  );
}
