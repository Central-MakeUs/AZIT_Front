import { Button, type ButtonProps } from '@azit/design-system/button';

import * as styles from '@/widgets/crew-join-status/styles/CrewJoinStatusSection.css';
import { RoundProfileImage } from '@/widgets/profile/ui';

interface CrewJoinStatusSectionProps {
  name: string;
  profileImageSrc: string;
  primaryMessage: string;
  secondaryMessage: string;
  buttonText: string;
  buttonState: ButtonProps['state'];
  buttonDisabled?: boolean;
  onButtonClick: () => void;
}

export function CrewJoinStatusSection({
  name,
  profileImageSrc,
  primaryMessage,
  secondaryMessage,
  buttonText,
  buttonState,
  buttonDisabled = false,
  onButtonClick,
}: CrewJoinStatusSectionProps) {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.crewInfoContainer}>
          <RoundProfileImage src={profileImageSrc} />
          <h1 className={styles.crewName}>{name}</h1>
        </div>
        <div className={styles.statusMessageContainer}>
          <p className={styles.primaryStatusMessage}>{primaryMessage}</p>
          <p className={styles.secondaryStatusMessage}>{secondaryMessage}</p>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          size="large"
          state={buttonState}
          onClick={onButtonClick}
          disabled={buttonDisabled}
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
