import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header, ShoppingCartIcon } from '@azit/design-system';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation';
import {
  StoreBanner,
  StoreCategoryButton,
  StoreGrid,
} from '@/features/store/ui';
import { mockStoreProducts } from '@/shared/mock/store';
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
                <ShoppingCartIcon
                  size={24}
                  onClick={() => push('CartPage', {})}
                />
              </div>
            }
          />
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.bannerSection}>
            <StoreBanner />
          </div>
          <div className={styles.productsSection}>
            <StoreCategoryButton label="전체" />
            <StoreGrid products={mockStoreProducts} />
          </div>
        </div>
      </AppLayout>
      <BottomNavigation activeTab="store" />
    </AppScreen>
  );
}
