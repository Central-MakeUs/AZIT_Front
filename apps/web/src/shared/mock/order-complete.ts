export interface OrderCompleteData {
  orderNumber: string;
  deliveryInfo: {
    name: string;
    phone: string;
    address: string;
  };
  payment: {
    totalProductPrice: number;
    membershipDiscount: number;
    pointDiscount: number;
    shippingFee: number;
    totalPayment: number;
  };
}

export const mockOrderCompleteData: OrderCompleteData = {
  orderNumber: '#AZ260110CUA2',
  deliveryInfo: {
    name: '김철수',
    phone: '010-1234-5678',
    address: '서울특별시 동작구 신대방동 현대아파트 105동 1601호',
  },
  payment: {
    totalProductPrice: 40000,
    membershipDiscount: 4000,
    pointDiscount: 1000,
    shippingFee: 0,
    totalPayment: 35000,
  },
};
