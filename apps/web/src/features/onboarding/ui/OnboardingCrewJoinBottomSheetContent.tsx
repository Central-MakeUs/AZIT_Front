import { Button, XIcon } from '@azit/design-system';
import { RoundProfileImage } from '@/widgets/profile/ui';
import * as styles from '../styles/OnboardingCrewJoinBottomSheetContent.css';
import type { CrewInfoResult } from '@/shared/api/models';
import { CATEGORY_LABELS } from '@/shared/constants/crew';

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
    crewProfileImage = '/azit.png',
  } = crewInfo;

  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="닫기"
        >
          <XIcon size={24} />
        </button>
      </header>
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
        <span className={styles.crewCategory}>
          {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
        </span>
        <span className={styles.crewMemberCount}>멤버 {memberCount}명</span>
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
