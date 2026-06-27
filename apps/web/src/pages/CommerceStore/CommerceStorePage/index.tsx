import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { useFlow } from '@/app/routes/stackflow';

import { CartIconButton } from '@/widgets/cart-icon-button';

import { StoreGridView } from '@/features/CommerceStore/ui';

import { logo } from '@/shared/styles/logo.css';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation/BottomNavigation';

import * as styles from './index.css';

export function CommerceStorePage() {
  const { push } = useFlow();

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header
            left={<h1 className={logo}>AZIT</h1>}
            right={
              <div className={styles.cartIconWrapper}>
                <CartIconButton onClick={() => push('CommerceCartPage', {})} />
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
