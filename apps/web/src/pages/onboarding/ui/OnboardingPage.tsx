import { useEffect, useState } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { AppLayout } from '@/shared/ui/layout';
import { useFunnel } from '@/features/onboarding/hooks/useFunnel';
import { OnboardingRoleSelect } from '@/features/onboarding/ui/OnboardingRoleSelect';
import {
  OnboardingCrewJoin,
  OnboardingCrewName,
  OnboardingCrewRegion,
  OnboardingShareInviteCode,
} from '@/features/onboarding/ui';
import { useFlow } from '@/app/routes/stackflow';
import { postCreateCrew } from '@/features/onboarding/api/postCreateCrew';
import { postJoinCrew } from '@/features/onboarding/api/postJoinCrew';

type StepName =
  | 'role-select'
  | 'crew-name'
  | 'crew-region'
  | 'share-invite-code'
  | 'enter-invite-code';

const ONBOARDING_FLOW: Record<
  StepName,
  ((ctx: unknown) => StepName) | StepName | null
> = {
  'role-select': (ctx) =>
    ctx === 'leader' ? 'crew-name' : 'enter-invite-code',
  'crew-name': 'crew-region',
  'crew-region': 'share-invite-code',
  'share-invite-code': null,
  'enter-invite-code': null,
};

type OnboardingState = {
  role?: 'leader' | 'member';
  crewName?: string;
  crewRegion?: string;
  inviteCode?: string;
};

export function OnboardingPage() {
  const { replace } = useFlow();
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

                  if (response.ok) {
                    setOnboardingState((prev) => ({
                      ...prev,
                      inviteCode: response.data.result.invitationCode,
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
                crewName={onboardingState.crewName ?? ''}
                crewProfileImage="/azit.png"
                inviteCode={onboardingState.inviteCode ?? ''}
                onNext={() => {
                  context.onNext();
                  replace('StorePage', {}, { animate: false });
                  // 심사 위해 임시로 스토어 페이지를 홈페이지로 사용
                }}
              />
            )}
          />
          <Funnel.Step
            name="enter-invite-code"
            render={(context) => (
              <OnboardingCrewJoin
                onNext={async (inviteCode, crewId) => {
                  const response = await postJoinCrew({
                    invitationCode: inviteCode,
                  });

                  if (response.ok) {
                    context.onNext();
                    replace(
                      'CrewJoinStatusPage',
                      { crewId },
                      { animate: false }
                    );
                  } else {
                    // TODO: 에러 처리
                    console.error(response.error);
                  }
                }}
                onPrev={() => {
                  context.onPrev();
                }}
              />
            )}
          />
        </Funnel>
      </AppLayout>
    </AppScreen>
  );
}
