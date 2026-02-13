import { useEffect, useMemo, useState } from 'react';

import { useAddressSelectionStore } from '@/shared/store/addressSelection';

import type { AddressFormValues } from '../model/types';

export function useAddressForm(initialData?: Partial<AddressFormValues>) {
  const [formValues, setFormValues] = useState<AddressFormValues>({
    recipientName: '',
    phoneNumber: '',
    zipcode: '',
    baseAddress: '',
    detailAddress: '',
    isDefault: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormValues((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const isValidForm = useMemo(() => {
    const { isDefault: _isDefault, ...textFields } = formValues;
    return Object.values(textFields).every((v) => v.trim() !== '');
  }, [formValues]);

  // 외부에서 데이터를 주입받아 폼을 초기화해야 할 때 사용
  const resetForm = (data: Partial<AddressFormValues>) => {
    setFormValues((prev) => ({ ...prev, ...data }));
  };

  const selectedAddress = useAddressSelectionStore(
    (state) => state.selectedAddress
  );
  const clearAddress = useAddressSelectionStore((state) => state.clearAddress);

  useEffect(() => {
    if (selectedAddress) {
      setFormValues((prev) => ({
        ...prev,
        zipcode: selectedAddress.zipcode,
        baseAddress: selectedAddress.baseAddress,
      }));
      clearAddress();
    }
  }, [selectedAddress, clearAddress]);

  return {
    formValues,
    setFormValues,
    isValidForm,
    resetForm,
  };
}
