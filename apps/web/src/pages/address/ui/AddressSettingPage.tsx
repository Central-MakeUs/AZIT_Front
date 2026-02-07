import { AppScreen } from '@stackflow/plugin-basic-ui';
import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import { AddressCard, AddressEmpty } from '@/features/address-setting/ui';
import { mockDeliveryAddressList } from '@/shared/mock/address';
import * as styles from '../styles/AddressSettingPage.css';
import { useFlow } from '@/app/routes/stackflow';

export function AddressSettingPage() {
  const { push } = useFlow();

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

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <Header color="sub" left={<BackButton />} center="배송지 설정" />
        <div className={styles.mainContainer}>
          {mockDeliveryAddressList.length > 0 ? (
            <div className={styles.addressListContainer}>
              {mockDeliveryAddressList.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyStateWrapper}>
              <AddressEmpty onRegister={handleRegister} />
            </div>
          )}
        </div>
      </AppLayout>
    </AppScreen>
  );
}
