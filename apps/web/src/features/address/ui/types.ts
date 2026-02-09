export type AddressFormMode = 'create' | 'edit';

export interface AddressFormValues {
  recipientName: string;
  phoneNumber: string;
  zipcode: string;
  baseAddress: string;
  detailAddress: string;
}
