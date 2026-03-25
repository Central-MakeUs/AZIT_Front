import { vars } from '@azit/design-system';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';

import { CrewJoinStatusSection } from '@/widgets/crew-join-status/ui';

import { useConfirmJoinStatus } from '@/features/crew-confirm-status/hooks/useConfirmJoinStatus';
import {
  CREW_JOIN_STATUS,
  STATUS_CONTENT,
} from '@/features/crew-join-status/model/crewJoinStatus';

import { memberQueries } from '@/shared/queries';
import { AppLayout } from '@/shared/ui/layout';

export function CrewBannedStatusPage() {
  const { data, isLoading } = useQuery({
    ...memberQueries.myInfoQuery(),
    select: (data) => {
      const result = data.result;
      if (!result) return null;
      if (result.status === 'KICKED_PENDING_CONFIRM') {
        return { ...result, status: CREW_JOIN_STATUS.EXPELLED };
      }

      return result;
    },
  });

  const { handleJoinStatus } = useConfirmJoinStatus(data ? data.status : null);

  if (isLoading || !data) {
    return null;
  }

  const { crewName, crewImageUrl } = data;
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
