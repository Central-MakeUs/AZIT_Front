import { useEffect, useState } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { Button } from '@azit/design-system/button';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import { AddressRegisterForm } from '@/features/address-setting/ui';
import { useAddressSelectionStore } from '@/shared/store/addressSelection';
import * as styles from '../styles/AddressRegisterPage.css';
import { useFlow } from '@/app/routes/stackflow';

export function AddressRegisterPage() {
  const { pop, push } = useFlow();
  const selectedAddress = useAddressSelectionStore(
    (state) => state.selectedAddress
  );
  const clearAddress = useAddressSelectionStore((state) => state.clearAddress);

  const [recipientName, setRecipientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [baseAddress, setBaseAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  useEffect(() => {
    if (selectedAddress) {
      setZipcode(selectedAddress.zipcode);
      setBaseAddress(selectedAddress.baseAddress);
      clearAddress();
    }
  }, [selectedAddress, clearAddress]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 연동 - registerDeliveryAddress
    console.log({
      recipientName,
      phoneNumber,
      zipcode,
      baseAddress,
      detailAddress,
    });
    pop();
  };

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <Header color="sub" sticky left={<BackButton />} center="배송지 등록" />
        <div className={styles.mainContainer}>
          <div className={styles.formWrapper}>
            <AddressRegisterForm
              recipientName={recipientName}
              phoneNumber={phoneNumber}
              zipcode={zipcode}
              baseAddress={baseAddress}
              detailAddress={detailAddress}
              onRecipientNameChange={setRecipientName}
              onPhoneNumberChange={setPhoneNumber}
              onZipcodeChange={setZipcode}
              onBaseAddressChange={setBaseAddress}
              onDetailAddressChange={setDetailAddress}
              onAddressSearchClick={() => push('AddressSearchPage', {})}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
        <div className={styles.footerWrapper}>
          <Button
            type="submit"
            form="address-register-form"
            state="active"
            size="large"
          >
            등록하기
          </Button>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
