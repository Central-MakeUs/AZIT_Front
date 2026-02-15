import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/address/styles/AddressRegisterEditPage.css';

import { useAddressForm } from '@/features/address/model/useAddressForm';
import { AddressForm } from '@/features/address/ui';

import { addressQueries, useUpdateAddress } from '@/shared/queries';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

export function AddressEditPage({ params }: { params: { id: number } }) {
  const { pop, push, replace } = useFlow();
  const updateMutation = useUpdateAddress();

  const { id: addressId } = params;

  const { data: address, isLoading } = useQuery({
    ...addressQueries.addressesQuery(),
    select: (data) => {
      if (!data.ok) return;

      const result = data.data.result.find((addr) => addr.id === addressId);
      if (!result) return;

      const { id: _id, ...restData } = result;
      return restData;
    },
  });

  useEffect(() => {
    if (!isLoading && !address) {
      replace('NotFoundPage', {});
    }
  }, [isLoading, address, replace]);

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
