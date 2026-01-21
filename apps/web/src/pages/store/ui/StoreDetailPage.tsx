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
import { mockStoreProducts } from '@/shared/mock/store';
import * as styles from '../styles/StoreDetailPage.css';
import { useFlow } from '@/app/routes/stackflow';

export function StoreDetailPage() {
  const { pop } = useFlow();

  const product = mockStoreProducts[0];

  const handleClick = () => {
    pop();
  };

  return (
    <AppScreen>
      <AppLayout>
        <Header
          sticky
          left={
            <button className={styles.iconButton} onClick={handleClick}>
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
            <StoreDetailInfo product={product} />
            <div className={styles.divider} />
            <div className={styles.detailsSection}>
              <StoreDetailBanner />
              <StoreDetailShipping shipping={product.shipping} />
              <StoreDetailRefund refundPolicy={product.refundPolicy} />
            </div>
            <div className={styles.divider} />
            <StoreDetailDescription details={product.details} />
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
