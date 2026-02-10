import type { DeliveryAddressResult } from '@/shared/api/models';

export type DeliveryAddress = DeliveryAddressResult;

export const mockDeliveryAddressList: DeliveryAddress[] = [
  {
    id: 1,
    recipientName: '김철수',
    phoneNumber: '010-1234-5678',
    zipcode: '06920',
    baseAddress: '서울특별시 동작구 신대방동 현대아파트 105동',
    detailAddress: '1601호',
    isDefault: true,
  },
  {
    id: 2,
    recipientName: '김철수',
    phoneNumber: '010-1234-5678',
    zipcode: '06920',
    baseAddress: '서울특별시 동작구 신대방동 현대아파트 105동',
    detailAddress: '1601호',
    isDefault: false,
  },
];

export const mockEmptyDeliveryAddressList: DeliveryAddress[] = [];
