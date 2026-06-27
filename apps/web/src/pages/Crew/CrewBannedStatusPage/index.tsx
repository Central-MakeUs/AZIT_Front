import { vars } from '@azit/design-system';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useSuspenseQuery } from '@tanstack/react-query';

import { CrewJoinStatusSection } from '@/widgets/crew-join-status/ui';

import { useConfirmJoinStatus } from '@/features/Crew/crew-confirm-status/hooks/useConfirmJoinStatus';
import {
  CREW_JOIN_STATUS,
  STATUS_CONTENT,
} from '@/features/Crew/crew-join-status/model/crewJoinStatus';

import { AsyncBoundary } from '@/shared/ui/async-boundary';
import { AppLayout } from '@/shared/ui/layout';
import { PageLoader } from '@/shared/ui/loading/PageLoader';

import { userQueries } from '@/entities/User/api/queries';

function CrewBannedStatusContent() {
  const { data: myCrewsData } = useSuspenseQuery(userQueries.myCrewsQuery());

  const expelledCrew =
    myCrewsData?.find((c) => c.memberStatus === 'EXPELLED') ?? null;
  const status = expelledCrew ? CREW_JOIN_STATUS.EXPELLED : null;

  const { handleJoinStatus } = useConfirmJoinStatus(status);

  const crewName = expelledCrew?.crewName ?? '';
  const crewImageUrl = expelledCrew?.crewImageUrl ?? null;
  const content = STATUS_CONTENT['EXPELLED'];

  return (
    <AppScreen backgroundColor={vars.colors.white}>
      <AppLayout>
        <CrewJoinStatusSection
          name={crewName}
          profileImageSrc={crewImageUrl ?? '/azit.png'}
          primaryMessage={content.primaryMessage}
          secondaryMessage={content.secondaryMessage}
          buttonText={content.buttonText}
          buttonState={content.buttonState}
          onButtonClick={handleJoinStatus}
        />
      </AppLayout>
    </AppScreen>
  );
}

export function CrewBannedStatusPage() {
  return (
    <AsyncBoundary suspenseFallback={<PageLoader />}>
      <CrewBannedStatusContent />
    </AsyncBoundary>
  );
}
