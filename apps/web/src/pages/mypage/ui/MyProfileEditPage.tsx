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

import { memberQueries } from '@/shared/queries';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

const MAX_NICKNAME_LENGTH = 10;

export function MyProfileEditPage() {
  const { data: myInfoData, isLoading } = useQuery(memberQueries.myInfoQuery());
  const myInfo = myInfoData?.result;

  const [nickname, setNickname] = useState(myInfo?.nickname ?? '');

  if (isLoading || !myInfo) return null;

  const isNicknameChanged = nickname !== myInfo.nickname && nickname.length > 0;

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_NICKNAME_LENGTH) {
      setNickname(value);
    }
  };

  const handleNicknameRemove = () => {
    setNickname('');
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
              src={myInfo.profileImageUrl}
              size={96}
              className={styles.profileImage}
            />
            <div className={styles.editBadgeWrapper}>
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
    </AppScreen>
  );
}
