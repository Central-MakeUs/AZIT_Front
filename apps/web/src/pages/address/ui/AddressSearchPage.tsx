import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { useFlow } from '@/app/routes/stackflow';

import type { KakaoPostcodeResult } from '@/features/address/model/useKakaoPostcode';
import { KakaoPostcode } from '@/features/address/ui';

import { useAddressSelectionStore } from '@/shared/store/addressSelection';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

import * as styles from '../styles/AddressSearchPage.css';

export function AddressSearchPage() {
  const { pop } = useFlow();
  const setSelectedAddress = useAddressSelectionStore(
    (state) => state.setSelectedAddress
  );

  const handleComplete = (data: KakaoPostcodeResult) => {
    const baseAddress =
      data.roadAddress + (data.extraAddress ? ` ${data.extraAddress}` : '');
    setSelectedAddress({
      zipcode: data.zonecode,
      baseAddress,
      extraAddress: data.extraAddress,
    });
    pop();
  };

  return (
    <AppScreen>
      <AppLayout>
        <Header sticky left={<BackButton />} center="우편번호 검색" />
        <div className={styles.mainContainer}>
          <KakaoPostcode onComplete={handleComplete} />
        </div>
      </AppLayout>
    </AppScreen>
  );
}
