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
      if (!data.ok) return null;
      const result = data.data.result;
      if (result.status === 'KICKED_PENDING_CONFIRM') {
        return { ...result, status: CREW_JOIN_STATUS.EXITED };
      }

      return result;
    },
  });

  const { handleJoinStatus } = useConfirmJoinStatus(data ? data.status : null);

  if (isLoading || !data) {
    return null;
  }

  const { crewName, profileImageUrl } = data;
  const content = STATUS_CONTENT['EXITED'];

  return (
    <AppScreen backgroundColor={vars.colors.white}>
      <AppLayout>
        <CrewJoinStatusSection
          name={crewName}
          profileImageSrc={profileImageUrl ?? '/azit.png'}
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
