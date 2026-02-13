import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header } from '@azit/design-system/header';
import { AppLayout } from '@/shared/ui/layout';
import { CartIconButton } from '@/shared/ui/cart-icon-button';
import { BottomNavigation } from '@/shared/ui/navigation';
import { StoreGridView } from '@/features/store/ui';
import * as styles from '../styles/StorePage.css';
import { logo } from '@/shared/styles/logo.css';
import { useFlow } from '@/app/routes/stackflow';

export function StorePage() {
  const { push } = useFlow();

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header
            left={<h1 className={logo}>AZIT</h1>}
            right={
              <div className={styles.cartIconWrapper}>
                <CartIconButton onClick={() => push('CartPage', {})} />
              </div>
            }
          />
        </div>
        <StoreGridView />
      </AppLayout>
      <BottomNavigation activeTab="store" />
    </AppScreen>
  );
}
