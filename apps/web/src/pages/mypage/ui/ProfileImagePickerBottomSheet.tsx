import { BottomSheet } from '@/shared/ui/bottom-sheet';

import * as styles from '../styles/ProfileImagePickerBottomSheet.css';

interface ProfileImagePickerBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLibrary: () => void;
  onSelectCamera: () => void;
  onSelectDefault: () => void;
}

export function ProfileImagePickerBottomSheet({
  isOpen,
  onClose,
  onSelectLibrary,
  onSelectCamera,
  onSelectDefault,
}: ProfileImagePickerBottomSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <ul className={styles.list}>
        <li>
          <button
            type="button"
            className={styles.item}
            onClick={onSelectLibrary}
          >
            앨범에서 선택
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.item}
            onClick={onSelectCamera}
          >
            사진 촬영
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.item}
            onClick={onSelectDefault}
          >
            기본 이미지로 변경
          </button>
        </li>
      </ul>
    </BottomSheet>
  );
}
