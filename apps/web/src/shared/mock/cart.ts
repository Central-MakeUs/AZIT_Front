export interface CartItem {
  id: string;
  brandId: string;
  name: string;
  size: string;
  expectedDelivery: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  isSoldOut: boolean;
}

export interface CartBrand {
  id: string;
  name: string;
  items: CartItem[];
}

export const mockCartData: CartBrand[] = [
  {
    id: 'brand-1',
    name: '브랜드명',
    items: [
      {
        id: 'item-1',
        brandId: 'brand-1',
        name: '제품 이름 제품 이름 제품 이름 제품',
        size: '230',
        expectedDelivery: '1.6(화) 이내 발송 예정',
        originalPrice: 20000,
        discountedPrice: 16000,
        quantity: 1,
        isSoldOut: false,
      },
      {
        id: 'item-2',
        brandId: 'brand-1',
        name: '제품 이름 제품 이름 제품 이름 제품',
        size: '230',
        expectedDelivery: '1.6(화) 이내 발송 예정',
        originalPrice: 20000,
        discountedPrice: 16000,
        quantity: 1,
        isSoldOut: false,
      },
    ],
  },
  {
    id: 'brand-2',
    name: '브랜드명',
    items: [
      {
        id: 'item-3',
        brandId: 'brand-2',
        name: '제품 이름 제품 이름 제품 이름 제품',
        size: '230',
        expectedDelivery: '1.6(화) 이내 발송 예정',
        originalPrice: 20000,
        discountedPrice: 16000,
        quantity: 1,
        isSoldOut: false,
      },
    ],
  },
];

export const mockCartDataWithSoldout: CartBrand[] = [
  {
    id: 'brand-1',
    name: '브랜드명',
    items: [
      {
        id: 'item-1',
        brandId: 'brand-1',
        name: '제품 이름 제품 이름 제품 이름 제품',
        size: '230',
        expectedDelivery: '1.6(화) 이내 발송 예정',
        originalPrice: 20000,
        discountedPrice: 16000,
        quantity: 1,
        isSoldOut: true,
      },
      {
        id: 'item-2',
        brandId: 'brand-1',
        name: '제품 이름 제품 이름 제품 이름 제품',
        size: '230',
        expectedDelivery: '1.6(화) 이내 발송 예정',
        originalPrice: 20000,
        discountedPrice: 16000,
        quantity: 1,
        isSoldOut: false,
      },
    ],
  },
  {
    id: 'brand-2',
    name: '브랜드명',
    items: [
      {
        id: 'item-3',
        brandId: 'brand-2',
        name: '제품 이름 제품 이름 제품 이름 제품',
        size: '230',
        expectedDelivery: '1.6(화) 이내 발송 예정',
        originalPrice: 20000,
        discountedPrice: 16000,
        quantity: 1,
        isSoldOut: false,
      },
      {
        id: 'item-4',
        brandId: 'brand-2',
        name: '제품 이름 제품 이름 제품 이름 제품',
        size: '230',
        expectedDelivery: '1.6(화) 이내 발송 예정',
        originalPrice: 20000,
        discountedPrice: 16000,
        quantity: 1,
        isSoldOut: true,
      },
      {
        id: 'item-5',
        brandId: 'brand-2',
        name: '제품 이름 제품 이름 제품 이름 제품',
        size: '230',
        expectedDelivery: '1.6(화) 이내 발송 예정',
        originalPrice: 20000,
        discountedPrice: 16000,
        quantity: 1,
        isSoldOut: false,
      },
    ],
  },
];
