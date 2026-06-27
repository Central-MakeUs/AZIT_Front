import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { AddImageIcon } from '@azit/design-system/icon';
import { Input } from '@azit/design-system/input';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useActivityParams } from '@stackflow/react';
import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useState } from 'react';

import { RoundProfileImage } from '@/widgets/profile/ui';

import { crewQueries } from '@/features/Crew/api/queries';

import { BusinessError } from '@/shared/api/apiHandler';
import { postPresignedUrl, updateS3Upload } from '@/shared/api/handlers';
import { MAX_CREW_NAME_LENGTH } from '@/shared/constants/crew';
import { DEFAULT_CREW_IMAGE_URL } from '@/shared/constants/url';
import { bridge } from '@/shared/lib/bridge';
import { base64ToBlob } from '@/shared/lib/image';
import { useStack } from '@/shared/lib/stackflow/useStack';
import { AsyncBoundary } from '@/shared/ui/async-boundary';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';
import { PageLoader } from '@/shared/ui/loading/PageLoader';
import { toastError, toastSuccess } from '@/shared/ui/toast';

import * as styles from './index.css';
import { ProfileImagePickerBottomSheet } from './ProfileImagePickerBottomSheet';

import { userQueries } from '@/entities/User/api/queries';

const MAX_CREW_INTRO_LENGTH = 20;
const MAX_FILE_SIZE = 3 * 1024 * 1024;

function CrewInfoEditPageContent() {
  const { id } = useActivityParams<{ id: string }>();
  const crewId = Number(id);
  const queryClient = useQueryClient();
  const { pop } = useStack();

  const { data: crewDetailInfo } = useSuspenseQuery(
    crewQueries.crewDetailInfoQuery(crewId)
  );

  const [crewImageUrl, setCrewImageUrl] = useState<string | null>(null);
  const [isPickerLoading, setIsPickerLoading] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [crewNameError, setCrewNameError] = useState<string | null>(null);
  const [crewName, setCrewName] = useState<string | null>(null);
  const [crewIntro, setCrewIntro] = useState<string | null>(null);

  const { mutate: updateCrew, isPending } = useMutation({
    ...crewQueries.updateCrewInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueries.myCrewsKey(),
      });
      queryClient.invalidateQueries({
        queryKey: crewQueries.crewDetailInfoKey(crewId),
      });
      toastSuccess('크루 정보가 수정되었습니다.');
      pop();
    },
    onError: (error) => {
      if (
        error instanceof BusinessError &&
        error.code === 'INVALID_CREW_NAME_CHARACTERS'
      ) {
        setCrewNameError(error.message);
        return;
      }
      toastError(
        error instanceof Error ? error.message : '요청에 실패했습니다.'
      );
    },
  });

  const currentCrewName = crewName ?? crewDetailInfo?.name ?? '';
  const currentCrewIntro = crewIntro ?? crewDetailInfo?.description ?? '';

  const isCrewNameChanged = currentCrewName !== crewDetailInfo?.name;
  const isCrewIntroChanged =
    currentCrewIntro !== (crewDetailInfo?.description ?? '');
  const isChanged =
    isCrewNameChanged || isCrewIntroChanged || crewImageUrl !== null;

  const handleCrewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= MAX_CREW_NAME_LENGTH) {
      setCrewName(value);
      setCrewNameError(null);
    }
  };

  const handleCrewNameRemove = () => {
    setCrewName('');
  };

  const handleCrewIntroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CREW_INTRO_LENGTH) {
      setCrewIntro(value);
    }
  };

  const handleCrewIntroRemove = () => {
    setCrewIntro('');
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
        } = await postPresignedUrl('CREW_IMAGE', result.fileName, crewId);

        const blob = base64ToBlob(result.base64, result.mimeType);

        if (blob.size > MAX_FILE_SIZE) {
          throw new Error('파일 크기는 3MB 이하여야 합니다.');
        }

        await updateS3Upload(presignedUrl, blob, result.mimeType);
        setCrewImageUrl(imageUrl);
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
    setCrewImageUrl(DEFAULT_CREW_IMAGE_URL);
  };

  const handleSubmit = () => {
    if (!isChanged || isPending) return;
    updateCrew({
      crewId,
      name: currentCrewName,
      imageUrl: crewImageUrl ?? crewDetailInfo?.crewImageUrl ?? '',
      description: currentCrewIntro || undefined,
    });
  };

  return (
    <AppScreen backgroundColor={vars.colors.white}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header left={<BackButton />} center="크루 정보 수정" />
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.profileImageWrapper}>
            <RoundProfileImage
              src={crewImageUrl ?? crewDetailInfo?.crewImageUrl ?? undefined}
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
          <div className={styles.fieldsContainer}>
            <div className={styles.fieldSection}>
              <span className={styles.fieldLabel}>크루명</span>
              <Input
                value={currentCrewName}
                placeholder="크루 이름을 입력해주세요"
                onChange={handleCrewNameChange}
                onRemove={
                  currentCrewName.length > 0 ? handleCrewNameRemove : undefined
                }
                maxLength={MAX_CREW_NAME_LENGTH}
                state={crewNameError ? 'error' : 'default'}
              >
                <Input.Description
                  left={crewNameError ?? undefined}
                  right={`${currentCrewName.length}/${MAX_CREW_NAME_LENGTH}`}
                />
              </Input>
            </div>
            <div className={styles.fieldSection}>
              <span className={styles.fieldLabel}>크루 한줄 소개</span>
              <Input
                value={currentCrewIntro}
                placeholder="크루 한줄 소개를 입력해주세요"
                onChange={handleCrewIntroChange}
                onRemove={
                  currentCrewIntro.length > 0
                    ? handleCrewIntroRemove
                    : undefined
                }
                maxLength={MAX_CREW_INTRO_LENGTH}
              />
              <div className={styles.counterWrapper}>
                <span className={styles.counter}>
                  {currentCrewIntro.length}/{MAX_CREW_INTRO_LENGTH}
                </span>
              </div>
            </div>
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

export function CrewInfoEditPage() {
  return (
    <AsyncBoundary suspenseFallback={<PageLoader />}>
      <CrewInfoEditPageContent />
    </AsyncBoundary>
  );
}
