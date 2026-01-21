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

export function StorePage() {
  return (
    <AppScreen>
      <AppLayout>
        <Header
          sticky
          left={<h1 className={styles.logo}>AZIT</h1>}
          right={
            <div className={styles.cartIconWrapper}>
              <ShoppingCartIcon size={24} />
            </div>
          }
        />
        <div className={styles.pageContainer}>
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
