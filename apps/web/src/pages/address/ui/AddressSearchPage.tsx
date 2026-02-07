import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header } from '@azit/design-system/header';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import { KakaoPostcode } from '@/features/address-setting/ui';
import { useAddressSelectionStore } from '@/shared/store/addressSelection';
import * as styles from '../styles/AddressSearchPage.css';
import { useFlow } from '@/app/routes/stackflow';
import type { KakaoPostcodeResult } from '@/features/address-setting/model/useKakaoPostcode';

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
