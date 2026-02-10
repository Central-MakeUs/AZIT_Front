import { useEffect } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { Button } from '@azit/design-system/button';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import { AddressForm } from '@/features/address/ui';
import * as styles from '../styles/AddressRegisterEditPage.css';
import { useFlow } from '@/app/routes/stackflow';
import { useCreateAddress } from '@/shared/api/queries';
import { useAddressForm } from '@/features/address/model/useAddressForm';

export function AddressRegisterPage() {
  const { pop, push } = useFlow();
  const createMutation = useCreateAddress();

  const { formValues, setFormValues, isValidForm } = useAddressForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formValues, {
      onSuccess: () => {
        pop();
      },
    });
  };

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header color="sub" left={<BackButton />} center="배송지 등록" />
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.formWrapper}>
            <AddressForm
              formId="address-register-form"
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
            form="address-register-form"
            size="large"
            disabled={!isValidForm}
            state={isValidForm ? 'active' : 'disabled'}
          >
            등록하기
          </Button>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
