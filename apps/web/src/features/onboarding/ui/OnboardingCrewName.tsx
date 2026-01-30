import { Button } from '@azit/design-system';
import * as styles from '../styles/OnboardingCrewName.css';

export interface OnboardingCrewNameProps {
  onNext: () => void;
  onBack?: () => void;
}

export function OnboardingCrewName({ onNext }: OnboardingCrewNameProps) {
  return (
    <>
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
          />
          <span className={styles.charCount}>0/15</span>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        {/* <Button state="disabled" disabled onClick={onNext}> */}
        <Button onClick={onNext}>다음</Button>
      </div>
    </>
  );
}
