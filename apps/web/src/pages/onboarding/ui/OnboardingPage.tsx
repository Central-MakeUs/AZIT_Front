import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useState } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import {
  OnboardingCrewJoin,
  OnboardingCrewName,
  OnboardingCrewRegion,
} from '@/widgets/onboarding/ui';
import { OnboardingRoleSelect } from '@/widgets/onboarding/ui/OnboardingRoleSelect';

import { postCreateCrew } from '@/features/crew-create/api/postCreateCrew';
import { postJoinCrew } from '@/features/crew-join/api/postJoinCrew';

import { getQueryParam } from '@/shared/lib/url';
import { useFunnel } from '@/shared/lib/useFunnel';
import { AppLayout } from '@/shared/ui/layout';

type StepName =
  | 'role-select'
  | 'crew-name'
  | 'crew-region'
  | 'enter-invite-code';

const ONBOARDING_FLOW: Record<
  StepName,
  ((ctx: unknown) => StepName) | StepName | null
> = {
  'role-select': (ctx) =>
    ctx === 'leader' ? 'crew-name' : 'enter-invite-code',
  'crew-name': 'crew-region',
  'crew-region': null,
  'enter-invite-code': null,
};

type OnboardingState = {
  role?: 'leader' | 'member';
  crewName?: string;
  crewRegion?: string;
};

export function OnboardingPage() {
  const { replace } = useFlow();
  const { Funnel } = useFunnel<StepName>('role-select', ONBOARDING_FLOW);
  const defaultInviteCode = getQueryParam('inviteCode');

  const [onboardingState, setOnboardingState] = useState<OnboardingState>({});

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

                  replace(
                    'OnboardingCompletePage',
                    {
                      role: 'leader',
                      crewName: onboardingState.crewName!,
                      inviteCode: response.result.invitationCode,
                    },
                    { animate: false }
                  );
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
            name="enter-invite-code"
            render={(context) => (
              <OnboardingCrewJoin
                defaultValue={defaultInviteCode}
                onNext={async (inviteCode, _crewId, crewName) => {
                  await postJoinCrew({
                    invitationCode: inviteCode,
                  });

                  replace(
                    'OnboardingCompletePage',
                    { role: 'member', crewName },
                    { animate: false }
                  );
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
