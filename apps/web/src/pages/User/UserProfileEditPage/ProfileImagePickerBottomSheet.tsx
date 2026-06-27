import { vars } from '@azit/design-system';
import { Divider } from '@azit/design-system/divider';
import {
  AddImageIcon,
  CameraIcon,
  RemoveImageIcon,
} from '@azit/design-system/icon';

import { BottomSheet } from '@/shared/ui/bottom-sheet';

import * as styles from './ProfileImagePickerBottomSheet.css';

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
            <AddImageIcon style={{ color: vars.colors.gray60 }} size={20} />{' '}
            앨범에서 선택
          </button>
        </li>
        <Divider />
        <li>
          <button
            type="button"
            className={styles.item}
            onClick={onSelectCamera}
          >
            <CameraIcon style={{ color: vars.colors.gray60 }} size={20} />
            사진 촬영
          </button>
        </li>
        <Divider />
        <li>
          <button
            type="button"
            className={styles.item}
            onClick={onSelectDefault}
          >
            <RemoveImageIcon style={{ color: vars.colors.gray60 }} size={20} />
            기본 이미지로 변경
          </button>
        </li>
      </ul>
    </BottomSheet>
  );
}
