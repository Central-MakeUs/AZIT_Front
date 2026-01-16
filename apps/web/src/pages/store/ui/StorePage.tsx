import { AppScreen } from '@stackflow/plugin-basic-ui';
import { storeQueries } from '@/shared/api/queries';
import { useQuery } from '@tanstack/react-query';

export function StorePage() {
  const { data: products } = useQuery(storeQueries.productsQuery());
  console.log(products);
  // [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

  return <AppScreen>StorePage</AppScreen>;
}
