import { useState } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import {
  Header,
  ChevronLeftIcon,
  ShareIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
  Dropdown,
  Button,
  Divider,
} from '@azit/design-system';
import { AppLayout } from '@/shared/ui/layout';
import {
  StoreDetailImageSlider,
  StoreDetailInfo,
  StoreDetailBanner,
  StoreDetailShipping,
  StoreDetailRefund,
  StoreDetailDescription,
  StoreDetailItem,
} from '@/features/store/ui';
import { mockStoreProducts } from '@/shared/mock/store';
import * as styles from '../styles/StoreDetailPage.css';
import { useFlow } from '@/app/routes/stackflow';
import { BottomSheet } from '@/shared/ui/bottom-sheet';
import { footerWrapper } from '@/shared/styles/footer.css';

export function StoreDetailPage() {
  const { pop, push } = useFlow();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );

  const product = mockStoreProducts[0];

  const handleClick = () => {
    pop();
  };

  const handlePurchaseClick = () => {
    setIsBottomSheetOpen(true);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    console.log('Selected option:', selectedOption);
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
                <ShoppingCartIcon
                  size={24}
                  onClick={() => push('CartPage', {})}
                />
              </button>
            </div>
          }
        />
        <div className={styles.pageContainer}>
          <StoreDetailImageSlider />
          <div className={styles.contentWrapper}>
            <StoreDetailInfo product={product} />
            <Divider />
            <div className={styles.detailsSection}>
              <StoreDetailBanner />
              <StoreDetailShipping shipping={product.shipping} />
              <StoreDetailRefund refundPolicy={product.refundPolicy} />
            </div>
            <Divider />
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
        <div className={footerWrapper}>
          <Button size="large" state="active" onClick={handlePurchaseClick}>
            구매하기
          </Button>
        </div>
      </AppLayout>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onOutsideClick={() => setIsBottomSheetOpen(false)}
        contentClassName={styles.bottomSheetContent}
      >
        <Dropdown
          placeholder="옵션을 선택해주세요"
          options={['230', '235', '240'].map((option) => ({
            label: option,
            value: option,
          }))}
          onValueChange={handleOptionSelect}
        />
        <StoreDetailItem
          option={selectedOption}
          onCancel={() => setSelectedOption(undefined)}
        />
        {selectedOption && (
          <div className={styles.buttonWrapper}>
            <Button
              size="large"
              state="outline"
              onClick={() => setIsBottomSheetOpen(false)}
            >
              장바구니
            </Button>
            <Button
              size="large"
              state="active"
              onClick={() => {
                setIsBottomSheetOpen(false);
                push('OrderPage', {});
              }}
            >
              구매하기
            </Button>
          </div>
        )}
      </BottomSheet>
    </AppScreen>
  );
}
