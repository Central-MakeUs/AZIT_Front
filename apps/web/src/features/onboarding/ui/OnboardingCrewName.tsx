import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { useState } from 'react';

import * as styles from '@/features/onboarding/styles/OnboardingCrewName.css';

import { BackButton } from '@/shared/ui/button';

export interface OnboardingCrewNameProps {
  defaultValue?: string;
  onNext: (crewName: string) => void;
  onPrev: () => void;
}

export function OnboardingCrewName({
  defaultValue,
  onNext,
  onPrev,
}: OnboardingCrewNameProps) {
  const [crewName, setCrewName] = useState(defaultValue ?? '');

  const handleCrewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // 한글 입력시 maxLength 초과 방지
    if (value.length > 15) {
      value = value.substring(0, 15);
    }
    setCrewName(value);
  };

  return (
    <>
      <div className={styles.headerWrapper}>
        <Header left={<BackButton onClick={onPrev} />} />
      </div>
      <div className={styles.stepContainer}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>크루 이름을 알려주세요</h1>
          <p className={styles.subtitle}>최대 15자까지 입력할 수 있어요</p>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="크루 이름을 입력해주세요"
            maxLength={15}
            value={crewName}
            onChange={handleCrewNameChange}
          />
          <span className={styles.charCount}>{crewName.length}/15</span>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          state={crewName ? 'active' : 'disabled'}
          disabled={!crewName}
          onClick={() => onNext(crewName)}
        >
          다음
        </Button>
      </div>
    </>
  );
}
