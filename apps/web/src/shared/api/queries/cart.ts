import { getCartProducts } from '@/features/cart/api/getCartProducts';
import {
  queryOptions,
  mutationOptions,
  type QueryClient,
} from '@tanstack/react-query';
import type { CartProductAddRequest } from '../models';
import { postCartProductAdd } from '@/features/cart/api/postCartProductAdd';

export const cartQueries = {
  all: ['cart'] as const,
  productsQuery: () =>
    queryOptions({
      queryKey: [...cartQueries.all, 'products'],
      queryFn: () => getCartProducts(),
    }),
  addItemMutation: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (data: CartProductAddRequest) => postCartProductAdd(data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [...cartQueries.all, 'products'],
        });
      },
    }),
};
