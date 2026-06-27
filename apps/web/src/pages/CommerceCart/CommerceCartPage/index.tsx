import { Button } from '@azit/design-system/button';
import { Divider } from '@azit/design-system/divider';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { useFlow } from '@/app/routes/stackflow';

import { CartSkeleton } from '@/widgets/skeleton/ui';

import { CartProvider } from '@/features/CommerceCart/context/CartContext';
import { useCart } from '@/features/CommerceCart/model/useCart';
import {
  CartSelectionBar,
  CartBrandSection,
  CartSummary,
  CartEmpty,
} from '@/features/CommerceCart/ui';

import { formatPrice } from '@/shared/lib/formatters';
import { footerWrapper } from '@/shared/styles/footer.css';
import { AsyncBoundary } from '@/shared/ui/async-boundary';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

import * as styles from './index.css';

function CommerceCartPageContent() {
  const { push } = useFlow();
  const cart = useCart();
  const { cartData, isEmpty, hasSelectedItems, totalPayment, selectedItems } =
    cart;

  const handlePurchaseClick = () => {
    if (!hasSelectedItems) return;
    const cartItemIds = selectedItems
      .map((item) => item.id)
      .filter((id): id is number => typeof id === 'number' && id > 0);
    if (cartItemIds.length === 0) return;
    push('CommerceOrderPage', { cartItemIds: JSON.stringify(cartItemIds) });
  };

  return (
    <CartProvider value={cart}>
      <div className={styles.mainContainer}>
        {isEmpty ? (
          <CartEmpty />
        ) : (
          <>
            <CartSelectionBar />
            <Divider />
            <div className={styles.brandListWrapper}>
              {cartData.map((brand, index) => (
                <div key={brand.id}>
                  <CartBrandSection brand={brand} />
                  {index < cartData.length - 1 && <Divider />}
                </div>
              ))}
            </div>
            <Divider />
            <div className={styles.summaryWrapper}>
              <CartSummary />
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
            onClick={handlePurchaseClick}
          >
            {hasSelectedItems
              ? `${formatPrice(totalPayment)} 구매하기`
              : '상품을 선택해주세요'}
          </Button>
        </div>
      )}
    </CartProvider>
  );
}

export function CommerceCartPage() {
  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header left={<BackButton />} center="장바구니" />
        </div>
        <AsyncBoundary suspenseFallback={<CartSkeleton />}>
          <CommerceCartPageContent />
        </AsyncBoundary>
      </AppLayout>
    </AppScreen>
  );
}
