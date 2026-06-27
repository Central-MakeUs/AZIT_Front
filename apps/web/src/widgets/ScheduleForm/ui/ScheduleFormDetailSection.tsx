import { BellIcon, PlusIcon, TrashIcon } from '@azit/design-system/icon';
import { Input } from '@azit/design-system/input';
import { memo } from 'react';

import {
  MAX_SUPPLIES,
  SUPPLY_MAX_LENGTH,
} from '@/widgets/ScheduleForm/model/scheduleForm';
import * as styles from '@/widgets/ScheduleForm/styles/ScheduleForm.css';
import { AccordionItem } from '@/widgets/ScheduleForm/ui/AccordionItem';

export interface ScheduleFormDetailSectionProps {
  description: string;
  supplies: string[];
  isDetailFilled: boolean;
  open: boolean;
  onToggle: () => void;
  onDescriptionChange: (value: string) => void;
  onAddSupply: () => void;
  onUpdateSupply: (index: number, value: string) => void;
  onRemoveSupply: (index: number) => void;
}

export const ScheduleFormDetailSection = memo(
  function ScheduleFormDetailSection({
    description,
    supplies,
    isDetailFilled,
    open,
    onToggle,
    onDescriptionChange,
    onAddSupply,
    onUpdateSupply,
    onRemoveSupply,
  }: ScheduleFormDetailSectionProps) {
    return (
      <AccordionItem
        icon={<BellIcon size={20} color="default" />}
        label="상세 정보"
        filled={isDetailFilled}
        open={open}
        onToggle={onToggle}
      >
        <div className={styles.verticalSection}>
          <label className={styles.label} htmlFor="schedule-description">
            상세 설명
          </label>
          <textarea
            id="schedule-description"
            className={styles.textarea}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="상세 설명을 입력해주세요"
          />
        </div>

        <div className={styles.verticalSection}>
          <label className={styles.label} htmlFor="schedule-supply-0">
            준비물
          </label>
          {supplies.map((supply, index) => (
            <div key={index} className={styles.supplyRow}>
              <Input
                className={styles.inputFull}
                value={supply}
                onChange={(e) => onUpdateSupply(index, e.target.value)}
                placeholder="준비물을 입력하세요"
                maxLength={SUPPLY_MAX_LENGTH}
              />
              {index > 0 && (
                <button
                  type="button"
                  className={styles.supplyDeleteButton}
                  onClick={() => onRemoveSupply(index)}
                  aria-label="준비물 삭제"
                >
                  <TrashIcon size={24} color="primary" />
                </button>
              )}
            </div>
          ))}
          {supplies.length < MAX_SUPPLIES && (
            <button
              type="button"
              className={styles.addSupplyButton}
              onClick={onAddSupply}
            >
              <PlusIcon size={16} color="primary" aria-hidden />
              준비물 추가하기
            </button>
          )}
        </div>
      </AccordionItem>
    );
  }
);
