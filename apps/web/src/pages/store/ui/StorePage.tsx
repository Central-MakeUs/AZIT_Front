import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header } from '@azit/design-system/header';
import { ShoppingCartIcon } from '@azit/design-system/icon';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation';
import {
  StoreBanner,
  StoreCategoryButton,
  StoreGrid,
  StoreGridSkeleton,
} from '@/features/store/ui';
import * as styles from '../styles/StorePage.css';
import { logo } from '@/shared/styles/logo.css';
import { useFlow } from '@/app/routes/stackflow';
import { storeQueries } from '@/shared/api/queries';
import { useQuery } from '@tanstack/react-query';
import { scrollContainer } from '@/shared/styles/container.css';

export function StorePage() {
  const { push } = useFlow();
  const { data, isPending } = useQuery(storeQueries.productsQuery());

  const products = data?.ok ? (data.data.result.content ?? []) : [];

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
        <div className={scrollContainer}>
          <div className={styles.mainContainer}>
            <div className={styles.bannerSection}>
              <StoreBanner />
            </div>
            <div className={styles.productsSection}>
              <StoreCategoryButton label="전체" />
              {isPending ? (
                <StoreGridSkeleton />
              ) : (
                <StoreGrid products={products} />
              )}
            </div>
          </div>
        </div>
      </AppLayout>
      <BottomNavigation activeTab="store" />
    </AppScreen>
  );
}
