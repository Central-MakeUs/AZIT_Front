export interface StoreProduct {
  id: string;
  brandName: string;
  productName: string;
  originalPrice: number;
  discountRate: number;
  discountedPrice: number;
  imageUrl?: string;
}

export const mockStoreProducts: StoreProduct[] = [
  {
    id: '1',
    brandName: 'Brand name',
    productName: '제품 이름 제품 이름 제품 이름 제',
    originalPrice: 20000,
    discountRate: 20,
    discountedPrice: 16000,
  },
  {
    id: '2',
    brandName: 'Brand name',
    productName: '제품 이름 제품 이름 제품 이름 제',
    originalPrice: 20000,
    discountRate: 20,
    discountedPrice: 16000,
  },
  {
    id: '3',
    brandName: 'Brand name',
    productName: '제품 이름 제품 이름 제품 이름 제',
    originalPrice: 20000,
    discountRate: 20,
    discountedPrice: 16000,
  },
  {
    id: '4',
    brandName: 'Brand name',
    productName: '제품 이름 제품 이름 제품 이름 제',
    originalPrice: 20000,
    discountRate: 20,
    discountedPrice: 16000,
  },
];
