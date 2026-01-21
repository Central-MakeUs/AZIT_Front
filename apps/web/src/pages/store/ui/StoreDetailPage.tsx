import { AppScreen } from '@stackflow/plugin-basic-ui';
import {
  Header,
  ChevronLeftIcon,
  ShareIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
} from '@azit/design-system';
import { AppLayout } from '@/shared/ui/layout';
import {
  StoreDetailImageSlider,
  StoreDetailInfo,
  StoreDetailBanner,
  StoreDetailShipping,
  StoreDetailRefund,
  StoreDetailDescription,
} from '@/features/store/ui';
import * as styles from '../styles/StoreDetailPage.css';

// Mock 데이터 (추후 API로 대체)
const mockProduct = {
  id: '1',
  brandName: 'Brand name',
  productName: '제품 이름 제품 이름 제품 이름 제품 이름',
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
};

export function StoreDetailPage() {
  return (
    <AppScreen>
      <AppLayout>
        <Header
          sticky
          left={
            <button className={styles.iconButton}>
              <ChevronLeftIcon size={24} />
            </button>
          }
          right={
            <div className={styles.headerIconWrapper}>
              <button className={styles.iconButton}>
                <ShareIcon size={24} />
              </button>
              <button className={styles.iconButton}>
                <ShoppingCartIcon size={24} />
              </button>
            </div>
          }
        />
        <div className={styles.pageContainer}>
          <StoreDetailImageSlider />
          <div className={styles.contentWrapper}>
            <StoreDetailInfo product={mockProduct} />
            <div className={styles.divider} />
            <div className={styles.detailsSection}>
              <StoreDetailBanner />
              <StoreDetailShipping shipping={mockProduct.shipping} />
              <StoreDetailRefund refundPolicy={mockProduct.refundPolicy} />
            </div>
            <div className={styles.divider} />
            <StoreDetailDescription details={mockProduct.details} />
          </div>
          <div className={styles.moreInfoPlaceholder}>
            <div className={styles.moreInfoGradient}>
              <button className={styles.moreInfoButton}>
                <span className={styles.moreInfoButtonText}>
                  상품 정보 더보기
                </span>
                <ChevronDownIcon size={24} color="primary" />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.purchaseButtonWrapper}>
          <button className={styles.purchaseButton}>
            <span className={styles.purchaseButtonText}>구매하기</span>
          </button>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
