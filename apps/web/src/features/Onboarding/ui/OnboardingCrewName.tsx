import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { Input } from '@azit/design-system/input';

import {
  useCrewNameInput,
  VALID_CREW_NAME_REGEX,
} from '@/features/Onboarding/lib/useCrewNameInput';
import * as styles from '@/features/Onboarding/styles/OnboardingCrewName.css';

import { MAX_CREW_NAME_LENGTH } from '@/shared/constants/crew';
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
    crewNameError,
    setCrewNameError,
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
            state={crewNameError ? 'error' : 'default'}
          >
            <Input.Description
              left={crewNameError || undefined}
              right={`${currentCrewName.length}/${MAX_CREW_NAME_LENGTH}`}
            />
          </Input>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          state={currentCrewName ? 'active' : 'disabled'}
          disabled={!currentCrewName}
          onClick={() => {
            if (!VALID_CREW_NAME_REGEX.test(currentCrewName)) {
              setCrewNameError('특수문자는 사용할 수 없어요.');
              return;
            }
            onNext(currentCrewName);
          }}
        >
          다음
        </Button>
      </div>
    </>
  );
}
