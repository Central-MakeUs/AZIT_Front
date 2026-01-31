import type { OrderProduct } from './order';

export interface OrderHistoryGroup {
  orderId: string;
  dateLabel: string;
  products: OrderProduct[];
}

export const mockOrderHistoryList: OrderHistoryGroup[] = [
  {
    orderId: 'order-1',
    dateLabel: '2026.01.07(수)',
    products: [
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
    ],
  },
  {
    orderId: 'order-2',
    dateLabel: '2026.01.07(수)',
    products: [
      {
        id: 'product-3',
        brandName: '브랜드명',
        productName: '제품 이름 제품 이름 제품 이름 제품',
        originalPrice: 20000,
        discountedPrice: 16000,
        quantity: 1,
        points: 230,
      },
    ],
  },
];

/** 빈 목록 테스트 시 사용 (OrderHistoryPage에서 import 교체) */
export const mockOrderHistoryListEmpty: OrderHistoryGroup[] = [];
