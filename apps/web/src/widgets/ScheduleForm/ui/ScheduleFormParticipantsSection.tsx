import { UsersIcon } from '@azit/design-system/icon';
import { memo } from 'react';

import { PARTICIPANTS_MAX } from '@/widgets/ScheduleForm/model/scheduleForm';
import * as styles from '@/widgets/ScheduleForm/styles/ScheduleForm.css';
import { AccordionItem } from '@/widgets/ScheduleForm/ui/AccordionItem';

export interface ScheduleFormParticipantsSectionProps {
  maxParticipants: number | null;
  participantsError: boolean;
  isParticipantsFilled: boolean;
  open: boolean;
  onToggle: () => void;
  onParticipantsChange: (value: string) => void;
}

export const ScheduleFormParticipantsSection = memo(
  function ScheduleFormParticipantsSection({
    maxParticipants,
    participantsError,
    isParticipantsFilled,
    open,
    onToggle,
    onParticipantsChange,
  }: ScheduleFormParticipantsSectionProps) {
    return (
      <AccordionItem
        icon={<UsersIcon size={20} color="default" />}
        label="최대 인원"
        filled={isParticipantsFilled}
        open={open}
        onToggle={onToggle}
      >
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
              value={maxParticipants ?? ''}
              onChange={(e) => onParticipantsChange(e.target.value)}
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
      </AccordionItem>
    );
  }
);
