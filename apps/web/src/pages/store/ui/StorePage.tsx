import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { useFlow } from '@/app/routes/stackflow';

import { StoreGridView } from '@/features/store/ui';

import { logo } from '@/shared/styles/logo.css';
import { CartIconButton } from '@/shared/ui/cart-icon-button';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation';

import * as styles from '../styles/StorePage.css';

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
