import { AlertDialog } from '@azit/design-system/alert-dialog';
import { Chip } from '@azit/design-system/chip';
import { ChevronRightIcon, PlusIcon, XIcon } from '@azit/design-system/icon';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as styles from '@/widgets/mypage/styles/MyCrewInfoSection.css';

import { crewQueries } from '@/features/Crew/api/queries';

import { userQueries } from '@/entities/User/api/queries';
import type { MyCrewResult } from '@/entities/User/model';

interface MyCrewInfoSectionProps {
  crews: MyCrewResult[];
  onNavigateToCrew: (crewId: number) => void;
  onCreateNewCrew: () => void;
}

export function MyCrewInfoSection({
  crews,
  onNavigateToCrew,
  onCreateNewCrew,
}: MyCrewInfoSectionProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    ...crewQueries.deleteJoinRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueries.myCrewsKey(),
      });
    },
  });

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>나의 크루</span>
        <button
          type="button"
          className={styles.newCrewButton}
          onClick={onCreateNewCrew}
          disabled={crews.length >= 3}
        >
          <span className={styles.newCrewText}>새로운 크루</span>
          <PlusIcon size={16} className={styles.newCrewIcon} />
        </button>
      </div>

      {crews.length > 0 && (
        <div className={styles.crewList}>
          {crews.map((crew) => {
            const isJoined = crew.memberStatus === 'JOINED';
            const isRequested = crew.memberStatus === 'REQUESTED';

            if (!isJoined && !isRequested) return null;

            return (
              <div key={crew.crewId} className={styles.crewCard}>
                <div className={styles.crewCardLeft}>
                  {crew.crewImageUrl ? (
                    <img
                      src={crew.crewImageUrl}
                      alt={crew.crewName}
                      className={styles.crewAvatar}
                    />
                  ) : (
                    <div className={styles.crewAvatar} />
                  )}
                  <div className={styles.crewInfo}>
                    {isJoined && crew.memberRole ? (
                      <Chip
                        className={styles.roleChip}
                        type={
                          crew.memberRole === 'LEADER' ? 'primary' : 'skyblue'
                        }
                      >
                        {crew.memberRole === 'LEADER' ? '리더' : '멤버'}
                      </Chip>
                    ) : (
                      <Chip className={styles.roleChip} type="gray">
                        승인 대기중
                      </Chip>
                    )}
                    <span
                      className={
                        isJoined ? styles.crewName : styles.crewNamePending
                      }
                    >
                      {crew.crewName}
                    </span>
                  </div>
                </div>

                {isJoined ? (
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={() => onNavigateToCrew(crew.crewId)}
                    aria-label={`${crew.crewName} 크루 페이지로 이동`}
                  >
                    <ChevronRightIcon
                      size={20}
                      className={styles.chevronIcon}
                    />
                  </button>
                ) : (
                  <AlertDialog
                    trigger={
                      <button
                        type="button"
                        className={styles.iconButton}
                        disabled={deleteMutation.isPending}
                        aria-label={`${crew.crewName} 가입 신청 취소`}
                      >
                        <XIcon size={20} className={styles.closeIcon} />
                      </button>
                    }
                    title="크루 가입 신청을 취소하시겠습니까?"
                    description={`취소 시 대기 상태가 해제되며,\n가입을 원하실 경우 다시 신청해야 해요.`}
                    cancelText="닫기"
                    actionText="취소하기"
                    onAction={() =>
                      deleteMutation.mutate({ crewId: crew.crewId })
                    }
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
