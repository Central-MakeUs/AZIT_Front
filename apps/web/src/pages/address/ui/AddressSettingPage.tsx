import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { PlusIcon } from '@azit/design-system/icon';
import { Button } from '@azit/design-system/button';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import { AddressCard, AddressEmpty } from '@/features/address/ui';
import * as styles from '../styles/AddressSettingPage.css';
import { useFlow } from '@/app/routes/stackflow';
import {
  addressQueries,
  useDeleteAddress,
  useUpdateAddress,
} from '@/shared/api/queries';
import { useQueryClient } from '@tanstack/react-query';
import { orderQueries } from '@/shared/api/queries/order';

export function AddressSettingPage() {
  const { push, pop } = useFlow();
  const queryClient = useQueryClient();

  const deleteMutation = useDeleteAddress();
  const updateDefaultAddress = useUpdateAddress();
  const { data } = useQuery({ ...addressQueries.addressesQuery() });
  const addressList = data && data.ok ? data.data.result : [];

  const [defaultAddressId, setDefaultAddressId] = useState<number | null>(null);

  useEffect(() => {
    if (!addressList.length) return;

    const currentDefaultAddressId = addressList.find((a) => a.isDefault)?.id;
    if (!currentDefaultAddressId) return;

    setDefaultAddressId(currentDefaultAddressId);
  }, [addressList]);

  const handleDelete = async (id: number) => {
    // TODO: cofirm 필요
    const response = await deleteMutation.mutateAsync(id);
    if (!response.ok) {
      console.error(response.error);
      // TODO: 토스트 처리 (배송지 삭제에 실패했습니다.)
    }
  };

  const handleEdit = (id: number) => {
    push('AddressEditPage', { id });
  };

  const handleRegister = () => {
    push('AddressRegisterPage', {});
  };

  const handleComplete = async () => {
    const defaultAddressPayload = addressList.find(
      (item) => item.id === defaultAddressId
    );
    if (!defaultAddressPayload) return;

    const { id, ...payload } = defaultAddressPayload;
    payload.isDefault = true;
    const response = await updateDefaultAddress.mutateAsync({
      id,
      payload,
    });

    if (!response.ok) {
      // TODO: 토스트 처리 (배송지 변경에 실패했습니다.)
      return;
    }

    await queryClient.invalidateQueries({ queryKey: orderQueries.all });
    pop();
  };

  const handleSetDefault = (id: number) => {
    setDefaultAddressId(id);
  };

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header
            color="sub"
            left={<BackButton />}
            center="배송지 설정"
            right={
              <button
                onClick={handleRegister}
                type="button"
                aria-label="배송지 등록하기"
              >
                <PlusIcon size={24} color="default" aria-hidden />
              </button>
            }
          />
        </div>
        {addressList.length > 0 ? (
          <>
            <div className={styles.mainContainer}>
              <div className={styles.addressListContainer}>
                {addressList.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleSetDefault={handleSetDefault}
                    isDefault={address.id === defaultAddressId}
                  />
                ))}
              </div>
            </div>
            <div className={styles.footerButtonWrapper}>
              <Button state="active" size="large" onClick={handleComplete}>
                배송지 변경 완료
              </Button>
            </div>
          </>
        ) : (
          <div className={styles.emptyStateWrapper}>
            <AddressEmpty handleRegister={handleRegister} />
          </div>
        )}
      </AppLayout>
    </AppScreen>
  );
}
