import { AppScreen } from '@stackflow/plugin-basic-ui';
import { AppLayout } from '@/shared/ui/layout';
import { Button, type ButtonProps } from '@azit/design-system/button';
import { vars } from '@azit/design-system';
import { useFlow } from '@/app/routes/stackflow';
import * as styles from '../styles/CrewJoinStatusPage.css';
import { RoundProfileImage } from '@/widgets/profile/ui';
import type { CrewJoinStatusResult } from '@/shared/api/models';
import { useQuery } from '@tanstack/react-query';
import { crewQueries } from '@/shared/api/queries/crew';

type CrewJoinStatus = CrewJoinStatusResult['status'];

const STATUS_CONTENT: Record<
  CrewJoinStatus,
  {
    primaryMessage: string;
    secondaryMessage: string;
    buttonText: string;
    buttonState: ButtonProps['state'];
  }
> = {
  REQUESTED: {
    primaryMessage: '가입 요청이 완료되었어요',
    secondaryMessage: '요청이 승인되면 알림으로 알려드릴게요',
    buttonText: '승인 대기 중',
    buttonState: 'disabled',
  },
  JOINED: {
    primaryMessage: '가입 요청이 승인되었어요',
    secondaryMessage: '아지트에서 크루와 함께 활동해보세요',
    buttonText: '홈으로',
    buttonState: 'active',
  },
  REJECTED: {
    primaryMessage: '가입 요청이 거절되었어요',
    secondaryMessage: '크루 초대코드를 다시 확인해주세요',
    buttonText: '처음으로',
    buttonState: 'active',
  },
  // TODO: EXITED 관련 요구사항 반영
  EXITED: {
    primaryMessage: '크루를 탈퇴했어요',
    secondaryMessage: '크루 초대코드를 다시 확인해주세요',
    buttonText: '처음으로',
    buttonState: 'active',
  },
};

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

  const handleButtonClick = () => {
    if (status === 'JOINED' || status === 'REJECTED') {
      replace('HomePage', {}, { animate: false });
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
