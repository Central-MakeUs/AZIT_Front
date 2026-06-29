import { Button } from '@azit/design-system/button';

import * as styles from '@/features/Onboarding/styles/OnboardingCrewJoinBottomSheetContent.css';

import type { CrewInfoResult } from '@/entities/Crew/model';
import { RoundProfileImage } from '@/entities/User/ui/RoundProfileImage';

import { CATEGORY_LABELS } from '@/shared/constants/crew';

export interface CrewInfo extends CrewInfoResult {
  crewProfileImage?: string;
}

export interface OnboardingCrewJoinBottomSheetContentProps {
  crewInfo: CrewInfo;
  isSubmitting?: boolean;
  onRequestJoin: () => void;
}

export function OnboardingCrewJoinBottomSheetContent({
  crewInfo,
  isSubmitting = false,
  onRequestJoin,
}: OnboardingCrewJoinBottomSheetContentProps) {
  const {
    name = '',
    category = 'RUNNING',
    memberCount = 0,
    description,
    crewImageUrl = '/azit.png',
  } = crewInfo;

  return (
    <div className={styles.content}>
      <div className={styles.crewInfoSection}>
        <RoundProfileImage
          className={styles.crewLogoPlaceholder}
          src={crewImageUrl}
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
