import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Button } from '@azit/design-system/button';
import { Divider } from '@azit/design-system/divider';
import { Header } from '@azit/design-system/header';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import {
  CartSelectionBar,
  CartBrandSection,
  CartSummary,
  CartEmpty,
} from '@/features/cart/ui';
import { useCart } from '@/features/cart/model/useCart';
import * as styles from '../styles/CartPage.css';
import { formatPrice } from '@/shared/lib/formatters';
import { footerWrapper } from '@/shared/styles/footer.css';

export function CartPage() {
  const {
    cartData,
    isPending,
    isEmpty,
    selectedItemIds,
    selectedItems,
    allItems,
    isAllSelected,
    hasSelectedItems,
    totalProductPrice,
    membershipDiscount,
    shippingFee,
    totalPayment,
    handleSelectAll,
    handleItemSelectChange,
    handleBrandSelectChange,
    handleQuantityChange,
    handleDeleteItem,
    handleDeleteSelected,
  } = useCart();

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header left={<BackButton />} center="장바구니" />
        </div>
        <div className={styles.mainContainer}>
          {isPending ? (
            <div>로딩 중...</div>
          ) : isEmpty ? (
            <CartEmpty />
          ) : (
            <>
              <CartSelectionBar
                selectedCount={selectedItems.length}
                totalCount={allItems.length}
                isAllSelected={isAllSelected}
                onSelectAll={handleSelectAll}
                onDeleteSelected={handleDeleteSelected}
              />
              <Divider />
              <div className={styles.brandListWrapper}>
                {cartData.map((brand, index) => (
                  <div key={brand.id}>
                    <CartBrandSection
                      brand={brand}
                      selectedItemIds={selectedItemIds}
                      onItemSelectChange={handleItemSelectChange}
                      onBrandSelectChange={handleBrandSelectChange}
                      onQuantityChange={handleQuantityChange}
                      onDeleteItem={handleDeleteItem}
                    />
                    {index < cartData.length - 1 && <Divider />}
                  </div>
                ))}
              </div>
              <Divider />
              <div className={styles.summaryWrapper}>
                <CartSummary
                  totalProductPrice={totalProductPrice}
                  membershipDiscount={membershipDiscount}
                  shippingFee={shippingFee}
                  totalPayment={totalPayment}
                />
              </div>
            </>
          )}
        </div>
        {!isEmpty && (
          <div className={footerWrapper}>
            <Button
              className={styles.ctaButton}
              state={hasSelectedItems ? 'active' : 'disabled'}
              disabled={!hasSelectedItems}
            >
              {hasSelectedItems
                ? `${formatPrice(totalPayment)} 구매하기`
                : '상품을 선택해주세요'}
            </Button>
          </div>
        )}
      </AppLayout>
    </AppScreen>
  );
}
