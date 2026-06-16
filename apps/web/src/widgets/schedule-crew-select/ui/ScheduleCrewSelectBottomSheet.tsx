import { Divider } from '@azit/design-system/divider';
import { CheckIcon } from '@azit/design-system/icon';

import { RoundProfileImage } from '@/widgets/profile/ui/RoundProfileImage';
import * as styles from '@/widgets/schedule-crew-select/styles/ScheduleCrewSelectBottomSheet.css';

import { BottomSheet } from '@/shared/ui/bottom-sheet';

import type { JoinedCrewResult } from '@/entities/user/model/user.types';

interface ScheduleCrewSelectBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  crews: JoinedCrewResult[];
  selectedCrewId: number | null;
  onSelect: (crewId: number | null) => void;
}

export function ScheduleCrewSelectBottomSheet({
  isOpen,
  onClose,
  crews,
  selectedCrewId,
  onSelect,
}: ScheduleCrewSelectBottomSheetProps) {
  const handleSelect = (crewId: number | null) => {
    onSelect(crewId);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.titleBlock}>
          <p className={styles.title}>내 크루 선택</p>
          <p className={styles.subtitle}>일정을 확인할 크루를 선택하세요</p>
        </div>

        <div className={styles.list}>
          {crews.map((crew, index) => (
            <div key={crew.crewId}>
              <button
                type="button"
                onClick={() => handleSelect(crew.crewId)}
                className={styles.crewButton}
              >
                <div className={styles.crewInfo}>
                  <RoundProfileImage
                    src={crew.imageUrl}
                    alt={crew.name}
                    size={44}
                  />
                  <div className={styles.crewTextBlock}>
                    <p className={styles.crewName}>{crew.name}</p>
                    {crew.description && (
                      <p className={styles.crewDescription}>
                        {crew.description}
                      </p>
                    )}
                  </div>
                </div>
                {selectedCrewId === crew.crewId && (
                  <CheckIcon size={20} color="primary" />
                )}
              </button>
              {index < crews.length - 1 && (
                <Divider className={styles.divider} />
              )}
            </div>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}
