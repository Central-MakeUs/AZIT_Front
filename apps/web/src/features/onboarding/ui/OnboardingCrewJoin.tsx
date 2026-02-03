import { Button, Header, Input } from '@azit/design-system';
import * as styles from '../styles/OnboardingCrewJoin.css';
import { BackButton } from '@/shared/ui/button';
import { useState } from 'react';
import { BottomSheet } from '@/shared/ui/bottom-sheet/BottomSheet';
import { OnboardingCrewJoinBottomSheetContent } from './OnboardingCrewJoinBottomSheetContent';

export interface OnboardingCrewJoinProps {
  defaultValue?: string;
  onNext: () => void;
  onPrev: () => void;
}

const INVITE_CODE_LENGTH = 6;

export function OnboardingCrewJoin({
  defaultValue,
  onNext,
  onPrev,
}: OnboardingCrewJoinProps) {
  const [hasValidationError, setHasValidationError] = useState(false);
  const [inviteCode, setInviteCode] = useState(defaultValue ?? '');
  const isActive = inviteCode.length === INVITE_CODE_LENGTH;

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);

  const handleInviteCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasValidationError) {
      setHasValidationError(false);
    }
    setInviteCode(e.target.value.slice(0, INVITE_CODE_LENGTH));
  };

  const handleSubmit = () => {
    // TODO: API 검증 로직
    setIsCodeValid(true);
    setHasValidationError(false);
    setIsBottomSheetOpen(true);
  };

  return (
    <>
      <Header sticky left={<BackButton onClick={onPrev} />} />
      <div className={styles.stepContainer}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>초대 코드 입력하기</h1>
          <p className={styles.subtitle}>
            크루의 초대 코드 6자리를 입력해주세요
          </p>
        </div>
        <div className={styles.inputContainer}>
          <Input
            className={styles.inputField}
            state={hasValidationError ? 'error' : 'default'}
            value={inviteCode}
            onChange={handleInviteCodeChange}
            placeholder="초대 코드 6자리"
          />
          {hasValidationError && (
            <p className={styles.errorMessage}>유효하지 않은 코드에요</p>
          )}
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          state={isActive ? 'active' : 'disabled'}
          disabled={!isActive}
          onClick={handleSubmit}
        >
          다음
        </Button>
      </div>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onOutsideClick={() => setIsBottomSheetOpen(false)}
      >
        <OnboardingCrewJoinBottomSheetContent
          onClose={() => setIsBottomSheetOpen(false)}
          onRequestJoin={() => {
            // TODOD: 크루 가입 신청 API 호출
            onNext();
          }}
          crewInfo={{
            crewId: 1,
            name: 'azit',
            category: 'RUNNING',
            memberCount: 12,
          }}
        />
      </BottomSheet>
    </>
  );
}
