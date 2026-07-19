import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { NewFlagIcon, NewUsersIcon } from '@azit/design-system/icon';
import clsx from 'clsx';
import { useState } from 'react';

import * as styles from '@/features/Onboarding/styles/OnboardingRoleSelect.css';

import { BackButton } from '@/shared/ui/button';

export type OnboardingRoleType = 'leader' | 'member';

export interface OnboardingRoleSelectProps {
  defaultValue?: OnboardingRoleType;
  onNext: (role: OnboardingRoleType) => void;
  onPrev?: () => void;
}

interface OnboardingRoleCardItemProps {
  type: OnboardingRoleType;
  isSelected: boolean;
  onClick: () => void;
}

const ROLE_CONFIG = {
  leader: {
    chip: '크루장',
    subtitle: '우리 크루를 직접 만들고 이끌어요',
    bullets: [
      '초대 코드로 멤버 초대하기',
      '가입 승인하고 크루 관리하기',
      '정기런·번개런 일정 만들기',
    ],
    icon: <NewFlagIcon size={56} color="primary" />,
  },
  member: {
    chip: '크루원',
    subtitle: '초대받은 크루에서 함께 달려요',
    bullets: [
      '초대 코드로 크루 가입하기',
      '크루장 승인 후 크루 활동 참여하기',
      '번개런 일정 만들기',
    ],
    icon: <NewUsersIcon size={56} color="primary" />,
  },
} as const;

function OnboardingRoleCardItem({
  type,
  isSelected,
  onClick,
}: OnboardingRoleCardItemProps) {
  const config = ROLE_CONFIG[type];

  return (
    <button
      type="button"
      className={clsx(styles.roleCard, isSelected && styles.roleCardSelected)}
      onClick={onClick}
    >
      <span
        className={type === 'leader' ? styles.chipLeader : styles.chipMember}
      >
        {config.chip}
      </span>
      <p className={styles.roleSubtitle}>{config.subtitle}</p>
      <div className={styles.roleDescRow}>
        <ul className={styles.roleBullets}>
          {config.bullets.map((bullet) => (
            <li key={bullet}>• {bullet}</li>
          ))}
        </ul>
        <div className={styles.roleIcon}>{config.icon}</div>
      </div>
    </button>
  );
}

export function OnboardingRoleSelect({
  defaultValue,
  onNext,
  onPrev,
}: OnboardingRoleSelectProps) {
  const [selectedRole, setSelectedRole] = useState<OnboardingRoleType | null>(
    defaultValue ?? null
  );

  const handleNext = () => {
    if (!selectedRole) return;
    onNext(selectedRole);
  };

  return (
    <>
      {onPrev && (
        <div className={styles.headerWrapper}>
          <Header left={<BackButton onClick={onPrev} />} />
        </div>
      )}
      <div
        className={clsx(
          styles.stepContainer,
          onPrev && styles.stepContainerWithHeader
        )}
      >
        <div className={styles.headerSection}>
          <h1 className={styles.title}>어떻게 시작하시겠어요?</h1>
          <p className={styles.subtitle}>당신의 역할을 선택하세요</p>
        </div>

        <div className={styles.cardsSection}>
          <OnboardingRoleCardItem
            type="leader"
            isSelected={selectedRole === 'leader'}
            onClick={() => setSelectedRole('leader')}
          />
          <OnboardingRoleCardItem
            type="member"
            isSelected={selectedRole === 'member'}
            onClick={() => setSelectedRole('member')}
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
