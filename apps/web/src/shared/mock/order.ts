export interface OrderProduct {
  id: string;
  brandName: string;
  productName: string;
  imageUrl?: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  points: number;
}

export interface OrderAddress {
  name: string;
  phone: string;
  address: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  logoUrl?: string;
}

export const mockOrderProducts: OrderProduct[] = [
  {
    id: 'product-1',
    brandName: '브랜드명',
    productName: '제품 이름 제품 이름 제품 이름 제품',
    originalPrice: 20000,
    discountedPrice: 16000,
    quantity: 1,
    points: 230,
  },
  {
    id: 'product-2',
    brandName: '브랜드명',
    productName: '제품 이름 제품 이름 제품 이름 제품',
    originalPrice: 20000,
    discountedPrice: 16000,
    quantity: 1,
    points: 230,
  },
];

export const mockOrderAddress: OrderAddress = {
  name: '김철수',
  phone: '010-1234-5678',
  address: '서울특별시 동작구 신대방동 현대아파트 105동 1601호',
};

export const mockPaymentMethod: PaymentMethod = {
  id: 'naverpay',
  name: '네이버페이',
  logoUrl: '/icons/icon-naverpay.svg',
};

export const mockAvailablePoints = 2000;
