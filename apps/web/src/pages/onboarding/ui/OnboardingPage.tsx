import { useEffect, useState } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { AppLayout } from '@/shared/ui/layout';
import { useFunnel } from '@/features/onboarding/hooks/useFunnel';
import { OnboardingRoleSelect } from '@/features/onboarding/ui/OnboardingRoleSelect';
import {
  OnboardingCrewName,
  OnboardingCrewRegion,
  OnboardingShareInviteCode,
} from '@/features/onboarding/ui';
import { useFlow } from '@/app/routes/stackflow';
import { postCreateCrew } from '@/features/onboarding/api/postCreateCrew';

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
  const { push } = useFlow();
  const { Funnel } = useFunnel<StepName>('role-select', ONBOARDING_FLOW);

  const [onboardingState, setOnboardingState] = useState<OnboardingState>(
    () => {
      const saved = sessionStorage.getItem('onboarding-state');
      return saved ? JSON.parse(saved) : {};
    }
  );

  useEffect(() => {
    sessionStorage.setItem('onboarding-state', JSON.stringify(onboardingState));
  }, [onboardingState]);

  return (
    <AppScreen>
      <AppLayout>
        <Funnel>
          <Funnel.Step
            name="role-select"
            render={(context) => (
              <OnboardingRoleSelect
                defaultValue={onboardingState.role}
                onNext={(role) => {
                  setOnboardingState((prev) => ({ ...prev, role }));
                  context.onNext(role);
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
                onNext={async (crewRegion) => {
                  setOnboardingState((prev) => ({ ...prev, crewRegion }));

                  const response = await postCreateCrew({
                    name: onboardingState.crewName!,
                    category: 'RUNNING',
                    region: crewRegion,
                  });

                  if (response.result.invitationCode) {
                    setOnboardingState((prev) => ({
                      ...prev,
                      inviteCode: response.result.invitationCode,
                    }));
                  }
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
            render={(context) => (
              <OnboardingShareInviteCode
                crewName={onboardingState.crewName!}
                crewProfileImage="/azit.png"
                inviteCode={onboardingState.inviteCode ?? ''}
                onNext={() => {
                  context.onNext();
                  push('HomePage', {}, { animate: false });
                }}
              />
            )}
          />
          {/* TODO: 멤버 온보딩 UI 추가 */}
        </Funnel>
      </AppLayout>
    </AppScreen>
  );
}
