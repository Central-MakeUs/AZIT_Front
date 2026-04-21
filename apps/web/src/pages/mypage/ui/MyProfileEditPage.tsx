import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { AddImageIcon } from '@azit/design-system/icon';
import { Input } from '@azit/design-system/input';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import * as styles from '@/pages/mypage/styles/MyProfileEditPage.css';

import { RoundProfileImage } from '@/widgets/profile/ui';

import { postPresignedUrl, putS3Upload } from '@/shared/api/handlers';
import { bridge } from '@/shared/lib/bridge';
import { memberQueries } from '@/shared/queries';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

import { ProfileImagePickerBottomSheet } from './ProfileImagePickerBottomSheet';

const MAX_NICKNAME_LENGTH = 10;
const MAX_FILE_SIZE = 3 * 1024 * 1024;

export function MyProfileEditPage() {
  const { data: myInfoData } = useQuery(memberQueries.myInfoQuery());
  const myInfo = myInfoData?.result;

  const [nickname, setNickname] = useState(myInfo?.nickname ?? '');
  const [isPickerLoading, setIsPickerLoading] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const isNicknameChanged =
    nickname !== myInfo?.nickname && nickname.length > 0;

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_NICKNAME_LENGTH) {
      setNickname(value);
    }
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
          result: { presignedUrl },
        } = await postPresignedUrl('MEMBER_PROFILE', result.fileName);

        const binary = atob(result.base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        const blob = new Blob([bytes], { type: result.mimeType });

        if (blob.size > MAX_FILE_SIZE) {
          throw new Error('파일 크기는 3MB 이하여야 합니다.');
        }

        await putS3Upload(presignedUrl, blob, result.mimeType);
      }
    } finally {
      setIsPickerLoading(false);
    }
  };

  const handleSelectDefault = () => {
    setIsBottomSheetOpen(false);
    // TODO: 기본 이미지로 변경 구현 예정
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
              src={myInfo?.profileImageUrl}
              size={96}
              className={styles.profileImage}
            />
            <div
              className={styles.editBadgeWrapper}
              onClick={handleProfileImageBadgeClick}
              style={{ cursor: isPickerLoading ? 'not-allowed' : 'pointer' }}
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
              value={nickname}
              placeholder="닉네임을 입력해주세요"
              onChange={handleNicknameChange}
              onRemove={nickname.length > 0 ? handleNicknameRemove : undefined}
              maxLength={MAX_NICKNAME_LENGTH}
            />
            <div className={styles.counterWrapper}>
              <span className={styles.counter}>
                {nickname.length}/{MAX_NICKNAME_LENGTH}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.footerWrapper}>
          <Button state={isNicknameChanged ? 'active' : 'disabled'}>
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
