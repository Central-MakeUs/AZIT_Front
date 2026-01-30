import { useState, type ReactNode } from 'react';
import { Button, FlagIcon, UsersIcon } from '@azit/design-system';
import * as styles from '../styles/OnboardingRoleSelect.css';
import clsx from 'clsx';

export type OnboardingRoleType = 'leader' | 'member';

export interface OnboardingRoleSelectProps {
  defaultValue?: OnboardingRoleType;
  onNext: (role: OnboardingRoleType) => void;
}

export interface OnboardingRoleCardItemProps {
  icon: ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function OnboardingRoleCardItem({
  icon,
  label,
  isSelected,
  onClick,
}: OnboardingRoleCardItemProps) {
  return (
    <button
      type="button"
      className={clsx(styles.roleCard, isSelected && styles.roleCardSelected)}
      onClick={onClick}
    >
      <div className={styles.roleCardIcon}>{icon}</div>
      <span className={styles.roleCardLabel}>{label}</span>
    </button>
  );
}

export function OnboardingRoleSelect({
  defaultValue,
  onNext,
}: OnboardingRoleSelectProps) {
  const [selectedRole, setSelectedRole] = useState<OnboardingRoleType | null>(
    defaultValue ?? null
  );

  const handleRoleSelect = (role: OnboardingRoleType) => {
    setSelectedRole(role);
  };

  const handleNext = () => {
    if (!selectedRole) return;
    onNext(selectedRole);
  };

  return (
    <>
      <div className={styles.stepContainer}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>어떻게 시작하시겠어요?</h1>
          <p className={styles.subtitle}>당신의 역할을 선택하세요</p>
        </div>

        <div className={styles.cardsSection}>
          <OnboardingRoleCardItem
            icon={<FlagIcon size={36} color="primary" />}
            label="크루 만들기"
            isSelected={selectedRole === 'leader'}
            onClick={() => handleRoleSelect('leader')}
          />
          <OnboardingRoleCardItem
            icon={<UsersIcon size={36} color="primary" />}
            label="크루 참여하기"
            isSelected={selectedRole === 'member'}
            onClick={() => handleRoleSelect('member')}
          />
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          state={selectedRole ? 'active' : 'disabled'}
          disabled={!selectedRole}
          onClick={handleNext}
        >
          다음
        </Button>
      </div>
    </>
  );
}
