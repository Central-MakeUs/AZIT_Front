import { useState } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { AppLayout } from '@/shared/ui/layout';
import { useFunnel } from '@/features/onboarding/hooks/useFunnel';
import { OnboardingRoleSelect } from '@/features/onboarding/ui/OnboardingRoleSelect';
import {
  OnboardingCrewName,
  OnboardingCrewRegion,
  OnboardingShareInviteCode,
} from '@/features/onboarding/ui';
import { Header } from '@azit/design-system';
import { BackButton } from '@/shared/ui/button';

type StepName =
  | 'role-select'
  | 'crew-name'
  | 'crew-region'
  | 'share-invite-code'
  | 'member-join'
  | 'enter-invite-code'
  | 'request-complete';

const ONBOARDING_FLOW = {
  'role-select': {
    leader: 'crew-name',
    member: 'member-join',
  },
  'crew-name': 'crew-region',
  'crew-region': 'share-invite-code',
  'share-invite-code': null,
  'member-join': 'enter-invite-code',
  'enter-invite-code': 'request-complete',
  'request-complete': null,
} as const;

const initialStep = 'role-select';
const hideBackButton = ['role-select', 'share-invite-code'];

export function OnboardingPage() {
  const [Funnel, step, setStep] = useFunnel<StepName>(initialStep);

  const [history, setHistory] = useState<StepName[]>([]);
  const showBackButton = !hideBackButton.includes(step);

  const onBack = () => {
    if (history.length === 0) return;

    setStep(history[history.length - 1]);
    setHistory((prev) => prev.slice(0, -1));
  };

  const onNext = (action: () => void) => {
    action();
    setHistory((prev) => [...prev, step]);
  };

  return (
    <AppScreen>
      <AppLayout>
        {showBackButton && (
          <Header sticky left={<BackButton onClick={onBack} />} />
        )}
        <Funnel>
          <Funnel.Step name="role-select">
            <OnboardingRoleSelect
              onNext={(role) =>
                onNext(() =>
                  setStep(role === 'leader' ? 'crew-name' : 'member-join')
                )
              }
            />
          </Funnel.Step>
          <Funnel.Step name="crew-name">
            <OnboardingCrewName
              onNext={() => onNext(() => setStep('crew-region'))}
            />
          </Funnel.Step>
          <Funnel.Step name="crew-region">
            <OnboardingCrewRegion
              onNext={() => onNext(() => setStep('share-invite-code'))}
            />
          </Funnel.Step>
          <Funnel.Step name="share-invite-code">
            <OnboardingShareInviteCode
              crewName="test"
              crewProfileImage="example.png"
              inviteCode="123456"
            />
          </Funnel.Step>
          {/* TODO: 멤버 온보딩 UI 추가 */}
        </Funnel>
      </AppLayout>
    </AppScreen>
  );
}
