import { useState } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header } from '@azit/design-system/header';
import {
  ChevronLeftIcon,
  ShareIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
} from '@azit/design-system/icon';
import { Dropdown } from '@azit/design-system/dropdown';
import { Button } from '@azit/design-system/button';
import { Divider } from '@azit/design-system/divider';
import { AppLayout } from '@/shared/ui/layout';
import {
  StoreDetailImageSlider,
  StoreDetailInfo,
  StoreDetailBanner,
  StoreDetailShipping,
  StoreDetailRefund,
  StoreDetailDescription,
  StoreDetailItem,
  StoreDetailSkeleton,
} from '@/features/store/ui';
import * as styles from '../styles/StoreDetailPage.css';
import { useFlow } from '@/app/routes/stackflow';
import { BottomSheet } from '@/shared/ui/bottom-sheet';
import { footerWrapper } from '@/shared/styles/footer.css';
import { useActivityParams } from '@stackflow/react';
import { useQuery } from '@tanstack/react-query';
import { storeQueries } from '@/shared/api/queries';

export function StoreDetailPage() {
  const { pop, push } = useFlow();
  const { id } = useActivityParams<{ id: string }>();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );

  const { data, isPending, isError } = useQuery(
    storeQueries.productDetailQuery(id ?? '')
  );

  const product = data;

  if (!id) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }

  if (isPending) {
    return (
      <AppScreen>
        <AppLayout>
          <div className={styles.headerWrapper}>
            <Header
              left={
                <button
                  className={styles.iconButton}
                  type="button"
                  onClick={() => pop()}
                >
                  <ChevronLeftIcon size={24} />
                </button>
              }
              right={
                <div className={styles.headerIconWrapper}>
                  <button className={styles.iconButton} type="button">
                    <ShareIcon size={24} />
                  </button>
                  <button
                    className={styles.iconButton}
                    type="button"
                    onClick={() => push('CartPage', {})}
                  >
                    <ShoppingCartIcon size={24} />
                  </button>
                </div>
              }
            />
          </div>
          <StoreDetailSkeleton />
        </AppLayout>
      </AppScreen>
    );
  }

  if (isError || !product) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }

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
        <div className={styles.headerWrapper}>
          <Header
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
        </div>
        <div className={styles.mainContainer}>
          <StoreDetailImageSlider slideImageUrls={product.slideImageUrls} />
          <div className={styles.contentWrapper}>
            <StoreDetailInfo product={product} />
            <Divider />
            <div className={styles.detailsSection}>
              <StoreDetailBanner />
              <StoreDetailShipping
                shippingFee={product.shippingFee}
                expectedShippingDate={product.expectedShippingDate}
              />
              <StoreDetailRefund refundPolicy={product.refundPolicy} />
            </div>
            <Divider />
            <StoreDetailDescription
              description={product.description}
              detailImageUrls={product.detailImageUrls}
            />
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
