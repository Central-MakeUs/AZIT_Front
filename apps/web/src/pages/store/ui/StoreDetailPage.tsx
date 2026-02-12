import { useState } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header } from '@azit/design-system/header';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  ShareIcon,
  ShoppingCartIcon,
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
} from '@/features/store/ui';
import { StoreDetailSkeleton } from '@/widgets/skeleton/ui';
import * as styles from '../styles/StoreDetailPage.css';
import { useFlow } from '@/app/routes/stackflow';
import { BottomSheet } from '@/shared/ui/bottom-sheet';
import { footerWrapper } from '@/shared/styles/footer.css';
import { useActivityParams } from '@stackflow/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { storeQueries } from '@/shared/api/queries';
import { cartQueries } from '@/shared/api/queries/cart';
import { useKakaoShare } from '@/shared/lib/useKakaoShare';
import {
  OrderPolicyDropdown,
  OrderPolicyFooter,
} from '@/widgets/order-policy/ui';

export function StoreDetailPage() {
  const { pop, push } = useFlow();
  const { id } = useActivityParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { share: shareWithKakao } = useKakaoShare();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [selectedOptionId, setSelectedOptionId] = useState<number | undefined>(
    undefined
  );
  const [quantity, setQuantity] = useState(1);

  const { data, isPending, isError } = useQuery(
    storeQueries.productDetailQuery(id ?? '')
  );

  const addToCartMutation = useMutation(
    cartQueries.addItemMutation(queryClient)
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

  const handleShare = () => {
    const imageUrl =
      product.slideImageUrls?.[0] ?? product.detailImageUrls?.[0] ?? '';
    shareWithKakao({
      title: `[AZIT 스토어] ${product.productName} 크루 전용 특가 도착!
오직 AZIT 크루에게만 제공되는 단독 최저가! 지금 바로 앱에서 확인하고 혜택을 누려보세요.`,
      imageUrl,
      url: window.location.href,
      productName: product.productName ?? '',
      regularPrice: product.basePrice ?? 0,
      discountRate: product.discountRate ?? 0,
      discountPrice: product.salePrice ?? 0,
    });
  };

  const handlePurchaseClick = () => {
    setIsBottomSheetOpen(true);
  };

  const options =
    product.optionGroups?.[0]?.values?.map((optionValue) => ({
      label: optionValue.value || '',
      value: String(optionValue.id || ''),
    })) || [];

  const handleOptionSelect = (optionId: string) => {
    const selectedOptionValue = options.find((opt) => opt.value === optionId);
    setSelectedOption(selectedOptionValue?.label);
    setSelectedOptionId(Number(optionId));
    setQuantity(1);
  };

  const selectedSku = product.skus?.find((sku) =>
    sku.optionValueIds?.includes(selectedOptionId ?? -1)
  );

  const handleAddToCart = () => {
    if (!product.id || !selectedSku?.id) {
      return;
    }

    addToCartMutation.mutate(
      {
        productId: product.id,
        productSkuId: selectedSku.id,
        quantity: quantity,
      },
      {
        onSuccess: () => {
          setIsBottomSheetOpen(false);
          setSelectedOption(undefined);
          setSelectedOptionId(undefined);
          setQuantity(1);
        },
        onError: (error) => {
          console.error('장바구니 추가 실패:', error);
          // TODO: 에러 처리 (토스트 메시지 등)
        },
      }
    );
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
                <button
                  className={styles.iconButton}
                  type="button"
                  id="kakaotalk-sharing-btn"
                  onClick={handleShare}
                  aria-label="카카오 공유"
                >
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
          {/* <div className={styles.moreInfoPlaceholder}>
            <div className={styles.moreInfoGradient}>
              <button className={styles.moreInfoButton}>
                <span className={styles.moreInfoButtonText}>
                  상품 정보 더보기
                </span>
                <ChevronDownIcon size={24} color="primary" />
              </button>
            </div>
          </div> */}
          <Divider className={styles.divider} />
          <OrderPolicyDropdown />
          <OrderPolicyFooter />
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
          options={options}
          onValueChange={handleOptionSelect}
        />
        <StoreDetailItem
          option={selectedOption}
          salePrice={product.salePrice}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onCancel={() => {
            setSelectedOption(undefined);
            setSelectedOptionId(undefined);
            setQuantity(1);
          }}
        />
        {selectedOption && (
          <div className={styles.buttonWrapper}>
            <Button
              size="large"
              state="outline"
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending}
            >
              {addToCartMutation.isPending ? '추가 중...' : '장바구니'}
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
