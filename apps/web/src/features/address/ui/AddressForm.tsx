import { Input } from '@azit/design-system/input';
import { Button } from '@azit/design-system/button';
import * as styles from '../styles/AddressRegisterForm.css';
import type { AddressFormValues } from './types';

export interface AddressFormProps {
  formId: string;
  values: AddressFormValues;
  onValuesChange: (values: AddressFormValues) => void;
  onAddressSearchClick: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const formatPhoneNumber = (raw: string) => {
  const digits = raw.replace(/\D/g, '');
  const sliced = digits.slice(0, 11);

  if (sliced.length <= 3) return sliced;
  if (sliced.length <= 7) return `${sliced.slice(0, 3)}-${sliced.slice(3)}`;
  return `${sliced.slice(0, 3)}-${sliced.slice(3, 7)}-${sliced.slice(7)}`;
};

export function AddressForm({
  formId,
  values,
  onValuesChange,
  onAddressSearchClick,
  onSubmit,
}: AddressFormProps) {
  const handleRecipientNameChange = (value: string) => {
    onValuesChange({ ...values, recipientName: value });
  };

  const handlePhoneNumberChange = (value: string) => {
    onValuesChange({ ...values, phoneNumber: formatPhoneNumber(value) });
  };

  const handleZipcodeChange = (value: string) => {
    onValuesChange({ ...values, zipcode: value });
  };

  const handleBaseAddressChange = (value: string) => {
    onValuesChange({ ...values, baseAddress: value });
  };

  const handleDetailAddressChange = (value: string) => {
    onValuesChange({ ...values, detailAddress: value });
  };

  return (
    <form id={formId} className={styles.form} onSubmit={onSubmit}>
      <div className={styles.section}>
        <label className={styles.label} htmlFor="recipient-name">
          수령인
        </label>
        <Input
          id="recipient-name"
          className={styles.inputBase}
          value={values.recipientName}
          onChange={(e) => handleRecipientNameChange(e.target.value)}
          placeholder="수령인을 입력해주세요"
        />
      </div>

      <div className={styles.section}>
        <label className={styles.label} htmlFor="phone-number">
          연락처
        </label>
        <Input
          id="phone-number"
          type="tel"
          inputMode="numeric"
          pattern="\d*"
          className={styles.inputBase}
          value={values.phoneNumber}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
          placeholder="010-0000-0000"
        />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>주소</label>
        <div className={styles.addressRow}>
          <Input
            className={styles.readOnlyInput}
            value={values.zipcode}
            onChange={(e) => handleZipcodeChange(e.target.value)}
            placeholder="우편번호"
            disabled
          />
          <Button
            type="button"
            state="outline"
            size="medium"
            className={styles.addressSearchButton}
            onClick={onAddressSearchClick}
          >
            주소 찾기
          </Button>
        </div>
        <Input
          className={styles.readOnlyInput}
          value={values.baseAddress}
          onChange={(e) => handleBaseAddressChange(e.target.value)}
          placeholder="주소를 입력해주세요"
          disabled
        />
        <Input
          className={styles.inputBase}
          value={values.detailAddress}
          onChange={(e) => handleDetailAddressChange(e.target.value)}
          placeholder="상세 주소를 입력해주세요"
        />
      </div>
    </form>
  );
}
