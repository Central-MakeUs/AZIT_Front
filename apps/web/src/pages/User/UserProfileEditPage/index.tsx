import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { AddImageIcon } from '@azit/design-system/icon';
import { Input } from '@azit/design-system/input';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { RoundProfileImage } from '@/widgets/profile/ui';

import { postPresignedUrl, updateS3Upload } from '@/shared/api/handlers';
import { DEFAULT_PROFILE_IMAGE_BASE_URL } from '@/shared/constants/url';
import { bridge } from '@/shared/lib/bridge';
import { base64ToBlob } from '@/shared/lib/image';
import { useStack } from '@/shared/lib/stackflow/useStack';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';
import { toastError, toastSuccess } from '@/shared/ui/toast';

import * as styles from './index.css';
import { MAX_NICKNAME_LENGTH, nicknameSchema } from './profileEditForm';
import { ProfileImagePickerBottomSheet } from './ProfileImagePickerBottomSheet';

import { userQueries } from '@/entities/User/api/queries';

const DEFAULT_PROFILE_IMAGE_COUNT = 6;

const getRandomDefaultProfileImageUrl = () => {
  const index = Math.floor(Math.random() * DEFAULT_PROFILE_IMAGE_COUNT) + 1;
  return `${DEFAULT_PROFILE_IMAGE_BASE_URL}/default_${index}.svg`;
};
const MAX_FILE_SIZE = 3 * 1024 * 1024;

export function UserProfileEditPage() {
  const { data: myInfoData } = useQuery(userQueries.myInfoQuery());
  const myInfo = myInfoData?.result;
  const queryClient = useQueryClient();
  const { pop } = useStack();

  const [nickname, setNickname] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [isPickerLoading, setIsPickerLoading] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const { mutate: updateProfile, isPending } = useMutation({
    ...userQueries.updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueries.myInfoKey(),
      });
      toastSuccess('프로필이 수정되었습니다.');
      pop('Mypage');
    },
  });

  const currentNickname = nickname ?? myInfo?.nickname ?? '';
  const nicknameValidation =
    nickname !== null ? nicknameSchema.safeParse(nickname) : null;
  const nicknameError =
    nicknameValidation && !nicknameValidation.success
      ? nicknameValidation.error.issues[0].message
      : null;
  const isNicknameChanged =
    currentNickname !== myInfo?.nickname && currentNickname.length > 0;
  const isChanged =
    (isNicknameChanged || profileImageUrl !== null) && !nicknameError;

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleNicknameRemove = () => {
    setNickname('');
  };

  const handleProfileImageBadgeClick = () => {
    if (isPickerLoading) return;
    setIsBottomSheetOpen(true);
  };

  const handlePickImage = async (source: 'library' | 'camera') => {
    setIsBottomSheetOpen(false);
    setIsPickerLoading(true);
    try {
      const result = await bridge.pickProfileImage(source);
      if (result.success) {
        const {
          result: { presignedUrl, imageUrl },
        } = await postPresignedUrl('MEMBER_PROFILE', result.fileName);

        const blob = base64ToBlob(result.base64, result.mimeType);

        if (blob.size > MAX_FILE_SIZE) {
          throw new Error('파일 크기는 3MB 이하여야 합니다.');
        }

        await updateS3Upload(presignedUrl, blob, result.mimeType);
        setProfileImageUrl(imageUrl);
      }
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message);
      }
    } finally {
      setIsPickerLoading(false);
    }
  };

  const handleSelectDefault = () => {
    setIsBottomSheetOpen(false);
    setProfileImageUrl(getRandomDefaultProfileImageUrl());
  };

  const handleSubmit = () => {
    if (!isChanged) return;
    updateProfile({
      nickname: currentNickname,
      imageUrl: profileImageUrl ?? myInfo?.profileImageUrl ?? '',
    });
  };

  return (
    <AppScreen backgroundColor={vars.colors.white}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header left={<BackButton />} center="프로필 수정" />
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.profileImageWrapper}>
            <RoundProfileImage
              src={profileImageUrl ?? myInfo?.profileImageUrl}
              size={96}
              className={styles.profileImage}
            />
            <div
              className={
                styles.editBadgeWrapper[isPickerLoading ? 'loading' : 'idle']
              }
              onClick={handleProfileImageBadgeClick}
            >
              <div className={styles.editBadgeOuter} />
              <div className={styles.editBadgeInner}>
                <AddImageIcon size={16} color="inherit" />
              </div>
            </div>
          </div>
          <div className={styles.nicknameSection}>
            <span className={styles.nicknameLabel}>닉네임</span>
            <Input
              value={currentNickname}
              placeholder="닉네임을 입력해주세요"
              onChange={handleNicknameChange}
              onRemove={
                currentNickname.length > 0 ? handleNicknameRemove : undefined
              }
              state={nicknameError ? 'error' : undefined}
            >
              <Input.Description
                left={nicknameError ?? nicknameError}
                right={`${currentNickname.length}/${MAX_NICKNAME_LENGTH}`}
              />
            </Input>
          </div>
        </div>
        <div className={styles.footerWrapper}>
          <Button
            state={isChanged && !isPending ? 'active' : 'disabled'}
            onClick={handleSubmit}
          >
            수정하기
          </Button>
        </div>
      </AppLayout>
      <ProfileImagePickerBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        onSelectLibrary={() => handlePickImage('library')}
        onSelectCamera={() => handlePickImage('camera')}
        onSelectDefault={handleSelectDefault}
      />
    </AppScreen>
  );
}
