import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { Button } from '@azit/design-system/button';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import { AddressForm } from '@/features/address/ui';
import * as styles from '../styles/AddressRegisterEditPage.css';
import { useFlow } from '@/app/routes/stackflow';
import { addressQueries, useUpdateAddress } from '@/shared/api/queries';
import { useAddressForm } from '@/features/address/model/useAddressForm';

export function AddressEditPage() {
  const { pop, push, replace } = useFlow();
  const updateMutation = useUpdateAddress();

  const addressId = useMemo(() => {
    const pathMatch = window.location.pathname.match(/\/address\/(\d+)\/edit/);
    return pathMatch ? parseInt(pathMatch[1], 10) : null;
  }, []);

  useEffect(() => {
    if (!addressId) {
      replace('NotFoundPage', {});
    }
  }, [addressId, replace]);

  const { data: address } = useQuery({
    ...addressQueries.addressesQuery(),
    select: (data) => {
      if (!data.ok) return;

      const result = data.data.result.find((addr) => addr.id === addressId);
      if (!result) return;

      const { id: _id, ...restData } = result;
      return restData;
    },
  });

  const { formValues, setFormValues, isValidForm } = useAddressForm(address);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressId) return;

    updateMutation.mutate(
      {
        id: addressId,
        payload: formValues,
      },
      {
        onSuccess: () => {
          pop();
        },
      }
    );
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
