import { ChevronRightIcon, PlusIcon, XIcon } from '@azit/design-system/icon';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as styles from '@/widgets/mypage/styles/MyCrewInfoSection.css';

import { memberQueries } from '@/shared/queries';

import type { MyCrewResult } from '@/entities/user/model';

interface MyCrewInfoSectionProps {
  crews: MyCrewResult[];
  isCrewsLoading: boolean;
  onNavigateToCrew: (crewId: number) => void;
  onCreateNewCrew: () => void;
}

export function MyCrewInfoSection({
  crews,
  isCrewsLoading,
  onNavigateToCrew,
  onCreateNewCrew,
}: MyCrewInfoSectionProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    ...memberQueries.deleteJoinRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberQueries.myCrewsKey(),
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
          disabled={isCrewsLoading || crews.length >= 3}
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
                    <span
                      className={
                        isJoined ? styles.crewName : styles.crewNamePending
                      }
                    >
                      {crew.crewName}
                    </span>
                    {isJoined && crew.memberRole ? (
                      <span className={styles.roleBadge}>
                        {crew.memberRole === 'LEADER' ? '리더' : '멤버'}
                      </span>
                    ) : (
                      <span className={styles.pendingBadge}>승인 대기중</span>
                    )}
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
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={() =>
                      deleteMutation.mutate({ crewId: crew.crewId })
                    }
                    disabled={deleteMutation.isPending}
                    aria-label={`${crew.crewName} 가입 신청 취소`}
                  >
                    <XIcon size={20} className={styles.closeIcon} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
