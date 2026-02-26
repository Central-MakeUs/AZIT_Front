import { vars } from '@azit/design-system';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';

import { CrewJoinStatusSection } from '@/widgets/crew-join-status/ui';

import { useConfirmJoinStatus } from '@/features/crew-confirm-status/hooks/useConfirmJoinStatus';
import { STATUS_CONTENT } from '@/features/crew-join-status/model/crewJoinStatus';

import { crewQueries } from '@/shared/queries';
import { AppLayout } from '@/shared/ui/layout';

export function CrewJoinStatusPage({
  params,
}: {
  params: { crewId?: number };
}) {
  const { crewId = 0 } = params;
  const { data } = useQuery({
    ...crewQueries.joinStatusQuery(crewId),
    refetchOnMount: true,
    refetchInterval: 10000,
    enabled: crewId > 0,
    gcTime: 0,
  });

  const { handleJoinStatus } = useConfirmJoinStatus(
    data?.ok ? data.data.result.status : null
  );

  if (!data?.ok) {
    return null;
  }

  const { status, name } = data.data.result;

  if (status === 'EXITED') {
    return null;
  }

  const content = STATUS_CONTENT[status];

  return (
    <AppScreen backgroundColor={vars.colors.white}>
      <AppLayout>
        <CrewJoinStatusSection
          name={name}
          profileImageSrc="/azit.png"
          primaryMessage={content.primaryMessage}
          secondaryMessage={content.secondaryMessage}
          buttonText={content.buttonText}
          buttonState={content.buttonState}
          buttonDisabled={content.buttonState === 'disabled'}
          onButtonClick={handleJoinStatus}
        />
      </AppLayout>
    </AppScreen>
  );
}
