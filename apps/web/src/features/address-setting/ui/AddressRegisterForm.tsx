import { Input } from '@azit/design-system/input';
import { Button } from '@azit/design-system/button';
import * as styles from '../styles/AddressRegisterForm.css';

export interface AddressRegisterFormProps {
  recipientName: string;
  phoneNumber: string;
  zipcode: string;
  baseAddress: string;
  detailAddress: string;
  onRecipientNameChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onZipcodeChange: (value: string) => void;
  onBaseAddressChange: (value: string) => void;
  onDetailAddressChange: (value: string) => void;
  onAddressSearchClick: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddressRegisterForm({
  recipientName,
  phoneNumber,
  zipcode,
  baseAddress,
  detailAddress,
  onRecipientNameChange,
  onPhoneNumberChange,
  onZipcodeChange,
  onBaseAddressChange,
  onDetailAddressChange,
  onAddressSearchClick,
  onSubmit,
}: AddressRegisterFormProps) {
  return (
    <form
      id="address-register-form"
      className={styles.form}
      onSubmit={onSubmit}
    >
      <div className={styles.section}>
        <label className={styles.label} htmlFor="recipient-name">
          수령인
        </label>
        <Input
          id="recipient-name"
          className={styles.inputBase}
          value={recipientName}
          onChange={(e) => onRecipientNameChange(e.target.value)}
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
          className={styles.inputBase}
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
          placeholder="010-0000-0000"
        />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>주소</label>
        <div className={styles.addressRow}>
          <Input
            className={styles.readOnlyInput}
            value={zipcode}
            onChange={(e) => onZipcodeChange(e.target.value)}
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
          value={baseAddress}
          onChange={(e) => onBaseAddressChange(e.target.value)}
          placeholder="주소를 입력해주세요"
          disabled
        />
        <Input
          className={styles.inputBase}
          value={detailAddress}
          onChange={(e) => onDetailAddressChange(e.target.value)}
          placeholder="상세 주소를 입력해주세요"
        />
      </div>
    </form>
  );
}
