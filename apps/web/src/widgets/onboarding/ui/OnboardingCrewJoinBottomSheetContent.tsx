import { Button } from '@azit/design-system/button';

import * as styles from '@/widgets/onboarding/styles/OnboardingCrewJoinBottomSheetContent.css';
import { RoundProfileImage } from '@/widgets/profile/ui';

import { CATEGORY_LABELS } from '@/shared/constants/crew';

import type { CrewInfoResult } from '@/entities/crew/model';

export interface CrewInfo extends CrewInfoResult {
  crewProfileImage?: string;
}

export interface OnboardingCrewJoinBottomSheetContentProps {
  crewInfo: CrewInfo;
  isSubmitting?: boolean;
  onClose: () => void;
  onRequestJoin: () => void;
}

export function OnboardingCrewJoinBottomSheetContent({
  crewInfo,
  isSubmitting = false,
  onClose,
  onRequestJoin,
}: OnboardingCrewJoinBottomSheetContentProps) {
  const {
    name = '',
    category = 'RUNNING',
    memberCount = 0,
    description,
    crewProfileImage = '/azit.png',
  } = crewInfo;

  return (
    <div className={styles.content}>
      <div className={styles.crewInfoSection}>
        <RoundProfileImage
          className={styles.crewLogoPlaceholder}
          src={crewProfileImage}
          alt={name}
          size={96}
        />
        <h2 className={styles.crewName}>{name}</h2>
      </div>
      <div className={styles.crewMetaSection}>
        <span className={styles.crewMetaData}>
          {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]} / 멤버{' '}
          {memberCount}명
        </span>
        <span className={styles.crewMetaData}>{description}</span>
      </div>
      <div className={styles.buttonSection}>
        <Button
          className={styles.requestButton}
          state={isSubmitting ? 'disabled' : 'active'}
          disabled={isSubmitting}
          onClick={onRequestJoin}
        >
          가입 요청하기
        </Button>
      </div>
    </div>
  );
}
