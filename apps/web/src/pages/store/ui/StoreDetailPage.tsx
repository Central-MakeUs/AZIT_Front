import { Button } from '@azit/design-system/button';
import { Divider } from '@azit/design-system/divider';
import { Dropdown } from '@azit/design-system/dropdown';
import { Header } from '@azit/design-system/header';
import { ChevronLeftIcon, ShareIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useActivityParams } from '@stackflow/react';
import { Suspense } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/store/styles/StoreDetailPage.css';

import {
  OrderPolicyDropdown,
  OrderPolicyFooter,
} from '@/widgets/order-policy/ui';
import { StoreDetailSkeleton } from '@/widgets/skeleton/ui';
import {
  StoreDetailImageSlider,
  StoreDetailInfo,
  StoreDetailBanner,
  StoreDetailShipping,
  StoreDetailRefund,
  StoreDetailDescription,
  StoreDetailItem,
} from '@/widgets/store/ui';

import { useStoreDetail } from '@/features/store/model/useStoreDetail';

import { formatPrice } from '@/shared/lib/formatters';
import { useKakaoShare } from '@/shared/lib/useKakaoShare';
import { footerWrapper } from '@/shared/styles/footer.css';
import { BottomSheet } from '@/shared/ui/bottom-sheet';
import { CartIconButton } from '@/shared/ui/cart-icon-button';
import { BusinessErrorFallback, DomainErrorBoundary } from '@/shared/ui/error';
import { AppLayout } from '@/shared/ui/layout';

function StoreDetailContent({ id }: { id: string }) {
  const { pop, push } = useFlow();
  const { share: shareWithKakao } = useKakaoShare();

  const {
    product,
    isBottomSheetOpen,
    selectedItems,
    options,
    shippingFee,
    expectedPayment,
    isAddToCartPending,
    handleShare,
    handleOptionSelectClick,
    handleOptionSelect,
    handleAddToCart,
    handlePurchaseClick,
    closeBottomSheetAndResetOption,
    setItemQuantity,
    removeItem,
  } = useStoreDetail({
    productId: id,
    shareWithKakao,
    onPurchase: ({ skuId, quantity }) => push('OrderPage', { skuId, quantity }),
    onPurchaseMultiple: () => push('CartPage', {}),
  });

  return (
    <>
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
        <Divider className={styles.divider} />
        <OrderPolicyDropdown />
        <OrderPolicyFooter />
      </div>
      <div className={footerWrapper}>
        <Button size="large" state="active" onClick={handleOptionSelectClick}>
          구매하기
        </Button>
      </div>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onOutsideClick={closeBottomSheetAndResetOption}
        contentClassName={styles.bottomSheetContent}
      >
        <div className={styles.bottomSheetContentWrapper}>
          <div className={styles.dropdownWrapper}>
            <Dropdown
              placeholder="옵션을 선택해주세요"
              options={options}
              onValueChange={handleOptionSelect}
              isPlaceholder={true}
            />
          </div>

          <div className={styles.selectedOptionList}>
            {selectedItems.map((item) => (
              <StoreDetailItem
                key={item.id}
                option={item.optionLabel}
                salePrice={product.salePrice}
                shippingDate={product.expectedShippingDate}
                quantity={item.quantity}
                onQuantityChange={(q) => setItemQuantity(item.id, q)}
                onCancel={() => removeItem(item.id)}
              />
            ))}
          </div>
          {selectedItems.length > 0 && (
            <div className={styles.selectedOptionContainer}>
              <Divider />
              <div className={styles.expectFeeContainer}>
                <p className={styles.expectFeeLabel}>예상 결제 금액</p>
                <p className={styles.expectFeeAmount}>
                  <span className={styles.expectFeeAmountValue}>
                    {formatPrice(expectedPayment)}
                  </span>
                  <span className={styles.shippingFeeValue}>
                    {shippingFee > 0
                      ? `배송비 ${formatPrice(shippingFee)}`
                      : '무료배송'}
                  </span>
                </p>
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  size="large"
                  state="outline"
                  onClick={handleAddToCart}
                  disabled={isAddToCartPending}
                >
                  {isAddToCartPending ? '추가 중...' : '장바구니'}
                </Button>
                <Button
                  size="large"
                  state="active"
                  onClick={handlePurchaseClick}
                >
                  구매하기
                </Button>
              </div>
            </div>
          )}
        </div>
      </BottomSheet>
    </>
  );
}

export function StoreDetailPage() {
  const { pop, push } = useFlow();
  const { id } = useActivityParams<{ id: string }>();

  return (
    <AppScreen>
      <AppLayout>
        <DomainErrorBoundary
          fallback={({ error, reset }) => (
            <BusinessErrorFallback error={error} onReset={reset} />
          )}
        >
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
                  <CartIconButton onClick={() => push('CartPage', {})} />
                </div>
              }
            />
          </div>
          <Suspense fallback={<StoreDetailSkeleton />}>
            <StoreDetailContent id={id} />
          </Suspense>
        </DomainErrorBoundary>
      </AppLayout>
    </AppScreen>
  );
}
