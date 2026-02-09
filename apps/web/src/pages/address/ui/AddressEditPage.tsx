import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { Button } from '@azit/design-system/button';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import { AddressForm } from '@/features/address/ui';
import type { AddressFormValues } from '@/features/address/ui/types';
import * as styles from '../styles/AddressRegisterEditPage.css';
import { useFlow } from '@/app/routes/stackflow';
import { addressQueries, useUpdateAddress } from '@/shared/api/queries';

export function AddressEditPage() {
  const { pop, push, replace } = useFlow();
  const updateMutation = useUpdateAddress();

  const addressId = useMemo(() => {
    const pathMatch = window.location.pathname.match(/\/address\/(\d+)\/edit/);
    return pathMatch ? parseInt(pathMatch[1], 10) : null;
  }, []);

  if (!addressId) {
    replace('NotFoundPage', {});
    return;
  }

  const { data: address } = useQuery({
    ...addressQueries.addressesQuery(),
    select: (data) => {
      if (!data.ok) return undefined;
      return data.data.result.find((addr) => addr.id === addressId);
    },
  });

  const [formValues, setFormValues] = useState<AddressFormValues>({
    recipientName: '',
    phoneNumber: '',
    zipcode: '',
    baseAddress: '',
    detailAddress: '',
  });
  const isValidForm = useMemo(
    () => Object.values(formValues).every((value) => value),
    [formValues]
  );

  useEffect(() => {
    if (address) {
      const { id, isDefault, ...currentFormValues } = address;
      setFormValues(currentFormValues);
    }
  }, [address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(formValues).some((value) => !value)) {
      // TODO: 토스트 처리 (모든 필드를 입력해주세요)
      return;
    }

    const response = await updateMutation.mutateAsync({
      id: addressId,
      payload: { ...formValues, isDefault: address?.isDefault ?? false },
    });

    if (!response.ok) {
      alert('배송지 수정에 실패했습니다.');
      return;
    }

    pop();
  };

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header color="sub" left={<BackButton />} center="배송지 수정" />
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.formWrapper}>
            <AddressForm
              formId="address-edit-form"
              values={formValues}
              onValuesChange={setFormValues}
              onAddressSearchClick={() => push('AddressSearchPage', {})}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
        <div className={styles.footerWrapper}>
          <Button
            type="submit"
            form="address-edit-form"
            size="large"
            disabled={!isValidForm}
            state={isValidForm ? 'active' : 'disabled'}
          >
            수정하기
          </Button>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
