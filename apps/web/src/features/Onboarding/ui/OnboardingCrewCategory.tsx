import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { RunnerIcon } from '@azit/design-system/icon';
import clsx from 'clsx';
import { useState } from 'react';

import * as styles from '@/features/Onboarding/styles/OnboardingCrewCategory.css';

import { CATEGORY_LABELS } from '@/shared/constants/crew';
import { BackButton } from '@/shared/ui/button';

export type CrewCategory = keyof typeof CATEGORY_LABELS;

export interface OnboardingCrewCategoryProps {
  defaultValue?: CrewCategory;
  onNext: (category: CrewCategory) => void;
  onPrev: () => void;
}

export function OnboardingCrewCategory({
  defaultValue,
  onNext,
  onPrev,
}: OnboardingCrewCategoryProps) {
  const [selected, setSelected] = useState<CrewCategory | null>(
    defaultValue ?? null
  );

  return (
    <>
      <div className={styles.headerWrapper}>
        <Header left={<BackButton onClick={onPrev} />} />
      </div>
      <div className={styles.stepContainer}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>카테고리를 선택해요</h1>
          <p className={styles.subtitle}>어떤 크루인지 알려주세요</p>
        </div>

        <div className={styles.cardsGrid}>
          <button
            type="button"
            className={clsx(
              styles.categoryCard,
              selected === 'RUNNING' && styles.categoryCardSelected
            )}
            onClick={() => setSelected('RUNNING')}
          >
            <RunnerIcon size={32} />
            <span className={styles.categoryLabel}>
              {CATEGORY_LABELS.RUNNING}
            </span>
          </button>

          <div
            className={clsx(styles.categoryCard, styles.categoryCardDisabled)}
            aria-disabled="true"
          >
            <RunnerIcon size={32} />
            <span className={styles.categoryLabelDisabled}>준비중</span>
          </div>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          state={selected ? 'active' : 'disabled'}
          disabled={!selected}
          onClick={() => {
            if (!selected) return;
            onNext(selected);
          }}
        >
          다음
        </Button>
      </div>
    </>
  );
}
