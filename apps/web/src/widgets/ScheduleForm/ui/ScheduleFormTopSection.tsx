import { Input } from '@azit/design-system/input';
import { memo } from 'react';

import type { ScheduleFormValues } from '@/widgets/ScheduleForm/model/scheduleForm';
import { TITLE_MAX_LENGTH } from '@/widgets/ScheduleForm/model/scheduleForm';
import * as styles from '@/widgets/ScheduleForm/styles/ScheduleForm.css';
import { ChipButton } from '@/widgets/ScheduleForm/ui/ChipButton';

export interface ScheduleFormTopSectionProps {
  isLeader: boolean;
  runType: ScheduleFormValues['runType'];
  title: string;
  onRunTypeChange: (runType: ScheduleFormValues['runType']) => void;
  onTitleChange: (value: string) => void;
}

export const ScheduleFormTopSection = memo(function ScheduleFormTopSection({
  isLeader,
  runType,
  title,
  onRunTypeChange,
  onTitleChange,
}: ScheduleFormTopSectionProps) {
  return (
    <div className={styles.topGroup}>
      <div className={styles.section}>
        <div className={styles.runTypeWrapper}>
          <label className={styles.label}>런 종류</label>
          <div className={styles.runTypeChipButton}>
            {isLeader && (
              <ChipButton
                className={styles.runTypeChipButton}
                variant="primary"
                selected={runType === 'REGULAR'}
                onClick={() => onRunTypeChange('REGULAR')}
              >
                정기런
              </ChipButton>
            )}
            <ChipButton
              className={styles.runTypeChipButton}
              variant="secondary"
              selected={runType === 'LIGHTNING'}
              onClick={() => onRunTypeChange('LIGHTNING')}
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
        <Input
          id="schedule-title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="타이틀을 입력해주세요"
          maxLength={TITLE_MAX_LENGTH}
          onRemove={() => onTitleChange('')}
        >
          <Input.Description right={`${title.length}/${TITLE_MAX_LENGTH}`} />
        </Input>
      </div>
    </div>
  );
});
