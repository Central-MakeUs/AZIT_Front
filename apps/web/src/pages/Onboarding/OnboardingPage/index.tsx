import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useActivityParams } from '@stackflow/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import {
  OnboardingCrewJoin,
  OnboardingCrewName,
  OnboardingCrewRegion,
  OnboardingRoleSelect,
} from '@/features/Onboarding/ui';

import { crewEntityQueries as crewQueries } from '@/entities/Crew/api/queries';
import { userQueries } from '@/entities/User/api/queries';

import { BusinessError } from '@/shared/api/apiHandler';
import { getQueryParam } from '@/shared/lib/url';
import { useFunnel } from '@/shared/lib/useFunnel';
import { AppLayout } from '@/shared/ui/layout';
import { toastError } from '@/shared/ui/toast';

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
  const { replace, pop } = useFlow();
  const { isExtra } = useActivityParams<{ isExtra?: string }>();
  const { Funnel } = useFunnel<StepName>('role-select', ONBOARDING_FLOW);
  const defaultInviteCode = getQueryParam('inviteCode');
  const queryClient = useQueryClient();

  const [onboardingState, setOnboardingState] = useState<OnboardingState>({});
  const joinCrewNameRef = useRef('');
  const joinCrewImageUrlRef = useRef('');

  const { mutate: joinCrew, isPending: isJoining } = useMutation({
    ...crewQueries.joinCrew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueries.myCrewsKey() });
      replace(
        'OnboardingCompletePage',
        {
          role: 'member',
          crewName: joinCrewNameRef.current,
          crewImageUrl: joinCrewImageUrlRef.current,
        },
        { animate: false }
      );
    },
    onError: (error) => {
      if (
        error instanceof BusinessError &&
        error.code === 'CREW_JOIN_LIMIT_EXCEEDED'
      ) {
        toastError(error.message);
      }
    },
  });

  const { mutate: createCrew, isPending: isCreating } = useMutation({
    ...crewQueries.createCrew,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: userQueries.myCrewsKey() });
      replace(
        'OnboardingCompletePage',
        {
          role: 'leader',
          crewName: onboardingState.crewName ?? '',
          inviteCode: response.result.invitationCode,
          crewImageUrl: response.result.crewImageUrl,
        },
        { animate: false }
      );
    },
    onError: (error) => {
      if (error instanceof BusinessError) {
        if (
          error.code === 'CREW_JOIN_LIMIT_EXCEEDED' ||
          error.code === 'INVALID_CREW_NAME_CHARACTERS'
        ) {
          toastError(error.message);
        }
      }
    },
  });

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
                onPrev={isExtra === 'true' ? () => pop() : undefined}
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
                isLoading={isCreating}
                onNext={(crewRegion) => {
                  setOnboardingState((prev) => ({ ...prev, crewRegion }));
                  createCrew({
                    name: onboardingState.crewName ?? '',
                    category: 'RUNNING',
                    region: crewRegion,
                  });
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
                isSubmitting={isJoining}
                onNext={(inviteCode, _crewId, crewName, crewImageUrl) => {
                  joinCrewNameRef.current = crewName;
                  joinCrewImageUrlRef.current = crewImageUrl;
                  joinCrew({ invitationCode: inviteCode });
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
