import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { Input } from '@azit/design-system/input';

import * as styles from '@/features/Onboarding/styles/OnboardingCrewName.css';

import { MAX_CREW_NAME_LENGTH } from '@/shared/constants/crew';
import { useCrewNameInput } from '@/shared/lib/useCrewNameInput';
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
  const {
    crewName: currentCrewName,
    handleChange: handleCrewNameChange,
    handleRemove: handleCrewNameRemove,
  } = useCrewNameInput(defaultValue);

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
          <Input
            value={currentCrewName}
            placeholder="크루 이름을 입력해주세요"
            onChange={handleCrewNameChange}
            onRemove={
              currentCrewName.length > 0 ? handleCrewNameRemove : undefined
            }
            maxLength={MAX_CREW_NAME_LENGTH}
          />
          <div className={styles.counterWrapper}>
            <span className={styles.counter}>
              {currentCrewName.length}/{MAX_CREW_NAME_LENGTH}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          state={currentCrewName ? 'active' : 'disabled'}
          disabled={!currentCrewName}
          onClick={() => onNext(currentCrewName)}
        >
          다음
        </Button>
      </div>
    </>
  );
}
