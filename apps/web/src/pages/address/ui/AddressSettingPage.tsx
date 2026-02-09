import { useState } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { PlusIcon } from '@azit/design-system/icon';
import { Button } from '@azit/design-system/button';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import { AddressCard, AddressEmpty } from '@/features/address-setting/ui';
import { mockDeliveryAddressList } from '@/shared/mock/address';
import * as styles from '../styles/AddressSettingPage.css';
import { useFlow } from '@/app/routes/stackflow';

export function AddressSettingPage() {
  const { push } = useFlow();
  const [addressList, setAddressList] = useState(mockDeliveryAddressList);

  const handleDelete = (id: number) => {
    // TODO: Delete API 연동
    console.log('Delete address:', id);
  };

  const handleEdit = (id: number) => {
    // TODO: Edit 네비게이션 연동
    console.log('Edit address:', id);
  };

  const handleRegister = () => {
    push('AddressRegisterPage', {});
  };

  const handleComplete = () => {
    // TODO: 배송지 변경 완료 API 연동
    console.log('Complete address change');
  };

  const handleSetDefault = (id: number) => {
    setAddressList((prevList) =>
      prevList.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <Header
          color="sub"
          left={<BackButton />}
          center="배송지 설정"
          right={
            <button onClick={handleRegister}>
              <PlusIcon size={24} color="default" aria-hidden />
            </button>
          }
        />
        <div className={styles.mainContainer}>
          {addressList.length > 0 ? (
            <div className={styles.addressListContainer}>
              {addressList.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  handleSetDefault={handleSetDefault}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyStateWrapper}>
              <AddressEmpty handleRegister={handleRegister} />
            </div>
          )}
        </div>
        {addressList.length > 0 && (
          <div className={styles.footerButtonWrapper}>
            <Button
              state="active"
              size="large"
              onClick={handleComplete}
              className={styles.footerButton}
            >
              배송지 변경 완료
            </Button>
          </div>
        )}
      </AppLayout>
    </AppScreen>
  );
}
