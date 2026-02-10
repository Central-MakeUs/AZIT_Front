import { AppScreen } from '@stackflow/plugin-basic-ui';
import { AppLayout } from '@/shared/ui/layout';
import { Button } from '@azit/design-system/button';
import { vars } from '@azit/design-system';
import { useFlow } from '@/app/routes/stackflow';
import * as styles from '../styles/CrewJoinStatusPage.css';
import { RoundProfileImage } from '@/widgets/profile/ui';
import { useQuery } from '@tanstack/react-query';
import { crewQueries } from '@/shared/api/queries/crew';
import { postConfirmJoinStatus } from '@/features/crew-join-status/api/postConfirmJoinStatus';
import { CREW_JOIN_STATUS, STATUS_CONTENT } from '../model/crewJoinStatus';

export function CrewJoinStatusPage({
  params,
}: {
  params: { crewId?: number };
}) {
  const { crewId = 0 } = params;
  const { replace } = useFlow();

  const { data } = useQuery({
    ...crewQueries.joinStatusQuery(crewId),
    enabled: crewId > 0,
  });

  const handleButtonClick = async () => {
    if (!data?.ok) return;
    const { status } = data.data.result;

    if (
      status === CREW_JOIN_STATUS.JOINED ||
      status === CREW_JOIN_STATUS.REJECTED
    ) {
      const response = await postConfirmJoinStatus();
      if (response.ok) {
        const redirectActivity =
          status === CREW_JOIN_STATUS.JOINED ? 'HomePage' : 'OnboardingPage';
        replace(redirectActivity, {}, { animate: false });
      } else {
        // TODO: 토스트 에러
        console.error(response.error);
      }
    }
  };

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
              onClick={handleButtonClick}
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
