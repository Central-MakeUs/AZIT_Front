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
import { CartProvider } from '@/features/cart/context/CartContext';
import { CartSkeleton } from '@/widgets/skeleton/ui';
import { useCart } from '@/features/cart/model/useCart';
import * as styles from '../styles/CartPage.css';
import { formatPrice } from '@/shared/lib/formatters';
import { footerWrapper } from '@/shared/styles/footer.css';

export function CartPage() {
  const cart = useCart();
  const { cartData, isPending, isEmpty, hasSelectedItems, totalPayment } = cart;

  return (
    <AppScreen>
      <AppLayout>
        <CartProvider value={cart}>
          <div className={styles.headerWrapper}>
            <Header left={<BackButton />} center="장바구니" />
          </div>
          <div className={styles.mainContainer}>
            {isPending ? (
              <CartSkeleton />
            ) : isEmpty ? (
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
              >
                {hasSelectedItems
                  ? `${formatPrice(totalPayment)} 구매하기`
                  : '상품을 선택해주세요'}
              </Button>
            </div>
          )}
        </CartProvider>
      </AppLayout>
    </AppScreen>
  );
}
