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

type StepName =
  | 'role-select'
  | 'crew-name'
  | 'crew-region'
  | 'share-invite-code'
  | 'member-join'
  | 'enter-invite-code'
  | 'request-complete';

const ONBOARDING_FLOW: Record<
  StepName,
  ((ctx: unknown) => StepName) | StepName | null
> = {
  'role-select': (ctx) => (ctx === 'leader' ? 'crew-name' : 'member-join'),
  'crew-name': 'crew-region',
  'crew-region': 'share-invite-code',
  'share-invite-code': null,
  'member-join': 'enter-invite-code',
  'enter-invite-code': 'request-complete',
  'request-complete': null,
};

type OnboardingState = {
  role?: 'leader' | 'member';
  crewName?: string;
  crewRegion?: string;
  inviteCode?: string;
};

export function OnboardingPage() {
  const { Funnel } = useFunnel<StepName>('role-select', ONBOARDING_FLOW);
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({});
  console.log('onboardingState', onboardingState);
  return (
    <AppScreen>
      <AppLayout>
        <Funnel>
          <Funnel.Step
            name="role-select"
            render={(context) => (
              <OnboardingRoleSelect
                defaultValue={onboardingState.role}
                onNext={(ctx) => {
                  setOnboardingState((prev) => ({ ...prev, role: ctx }));
                  context.onNext(ctx);
                }}
              />
            )}
          />
          <Funnel.Step
            name="crew-name"
            render={(context) => (
              <OnboardingCrewName
                onNext={(crewName) => {
                  setOnboardingState((prev) => ({ ...prev, crewName }));
                  context.onNext();
                }}
                onPrev={() => {
                  setOnboardingState((prev) => ({
                    ...prev,
                    crewName: undefined,
                  }));
                  context.onPrev();
                }}
                defaultValue={onboardingState.crewName}
              />
            )}
          />
          <Funnel.Step
            name="crew-region"
            render={(context) => (
              <OnboardingCrewRegion
                defaultValue={onboardingState.crewRegion}
                onNext={(crewRegion) => {
                  setOnboardingState((prev) => ({ ...prev, crewRegion }));
                  context.onNext();
                }}
                onPrev={() => {
                  setOnboardingState((prev) => ({
                    ...prev,
                    crewRegion: undefined,
                  }));
                  context.onPrev();
                }}
              />
            )}
          />
          <Funnel.Step
            name="share-invite-code"
            render={() => (
              <OnboardingShareInviteCode
                crewName={onboardingState.crewName!}
                crewProfileImage={'example.png'}
                inviteCode={onboardingState.inviteCode!}
              />
            )}
          />
          {/* TODO: 멤버 온보딩 UI 추가 */}
        </Funnel>
      </AppLayout>
    </AppScreen>
  );
}
