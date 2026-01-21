export interface StoreProduct {
  id: string;
  brandName: string;
  productName: string;
  originalPrice: number;
  discountRate: number;
  discountedPrice: number;
  imageUrl?: string;
  shipping?: {
    type: string;
    estimatedDate: string;
  };
  refundPolicy?: string;
  details?: string[];
}

export const mockStoreProducts: StoreProduct[] = [
  {
    id: '1',
    brandName: 'Brand name',
    productName: '제품 이름 제품 이름 제품 이름 제',
    originalPrice: 20000,
    discountRate: 20,
    discountedPrice: 16000,
    shipping: {
      type: '무료 배송',
      estimatedDate: '1.6(화) 이내 판매자 발송 예정',
    },
    refundPolicy: '판매자의 환불 정책에 따름',
    details: [
      '편안한 착용감을 위한 프리미엄 쿠션',
      '통기성 매쉬 소재로 발을 시원하게 유지',
      '무게 : 283g (270 사이즈 기준)',
    ],
  },
  {
    id: '2',
    brandName: 'Brand name',
    productName: '제품 이름 제품 이름 제품 이름 제',
    originalPrice: 20000,
    discountRate: 20,
    discountedPrice: 16000,
    shipping: {
      type: '무료 배송',
      estimatedDate: '1.6(화) 이내 판매자 발송 예정',
    },
    refundPolicy: '판매자의 환불 정책에 따름',
    details: [
      '편안한 착용감을 위한 프리미엄 쿠션',
      '통기성 매쉬 소재로 발을 시원하게 유지',
      '무게 : 283g (270 사이즈 기준)',
    ],
  },
  {
    id: '3',
    brandName: 'Brand name',
    productName: '제품 이름 제품 이름 제품 이름 제',
    originalPrice: 20000,
    discountRate: 20,
    discountedPrice: 16000,
    shipping: {
      type: '무료 배송',
      estimatedDate: '1.6(화) 이내 판매자 발송 예정',
    },
    refundPolicy: '판매자의 환불 정책에 따름',
    details: [
      '편안한 착용감을 위한 프리미엄 쿠션',
      '통기성 매쉬 소재로 발을 시원하게 유지',
      '무게 : 283g (270 사이즈 기준)',
    ],
  },
  {
    id: '4',
    brandName: 'Brand name',
    productName: '제품 이름 제품 이름 제품 이름 제',
    originalPrice: 20000,
    discountRate: 20,
    discountedPrice: 16000,
    shipping: {
      type: '무료 배송',
      estimatedDate: '1.6(화) 이내 판매자 발송 예정',
    },
    refundPolicy: '판매자의 환불 정책에 따름',
    details: [
      '편안한 착용감을 위한 프리미엄 쿠션',
      '통기성 매쉬 소재로 발을 시원하게 유지',
      '무게 : 283g (270 사이즈 기준)',
    ],
  },
];
