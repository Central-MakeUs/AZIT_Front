import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';

import * as styles from '@/pages/crew-join-status/styles/CrewJoinStatusPage.css';

import { RoundProfileImage } from '@/widgets/profile/ui';

import { useConfirmJoinStatus } from '@/features/crew-join-status/hooks/useConfirmJoinStatus';
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
  const content = STATUS_CONTENT[status];

  if (!content) {
    return null;
  }

  return (
    <AppScreen backgroundColor={vars.colors.white}>
      <AppLayout>
        <div className={styles.pageContainer}>
          <div className={styles.contentWrapper}>
            <div className={styles.crewInfoContainer}>
              <RoundProfileImage src="/azit.png" />
              <h1 className={styles.crewName}>{name}</h1>
            </div>
            <div className={styles.statusMessageContainer}>
              <p className={styles.primaryStatusMessage}>
                {content.primaryMessage}
              </p>
              <p className={styles.secondaryStatusMessage}>
                {content.secondaryMessage}
              </p>
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              size="large"
              state={content.buttonState}
              onClick={handleJoinStatus}
              disabled={content.buttonState === 'disabled'}
            >
              {content.buttonText}
            </Button>
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
