import { vars } from '@azit/design-system';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useSuspenseQuery } from '@tanstack/react-query';

import {
  CREW_JOIN_STATUS,
  STATUS_CONTENT,
} from '@/features/Crew/model/crewJoinStatus';
import { useConfirmJoinStatus } from '@/features/Crew/model/useConfirmJoinStatus';
import { CrewJoinStatusSection } from '@/features/Crew/ui';

import { userQueries } from '@/entities/User/api/queries';

import { AsyncBoundary } from '@/shared/ui/async-boundary';
import { PageErrorFallback } from '@/shared/ui/error';
import { AppLayout } from '@/shared/ui/layout';
import { PageLoader } from '@/shared/ui/loading/PageLoader';

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
    <AsyncBoundary
      suspenseFallback={<PageLoader />}
      errorFallback={<PageErrorFallback />}
    >
      <CrewBannedStatusContent />
    </AsyncBoundary>
  );
}
