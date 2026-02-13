import {
  queryOptions,
  mutationOptions,
  type QueryClient,
} from '@tanstack/react-query';

import { deleteCartProduct } from '@/features/cart/api/deleteCartProduct';
import { getCartProducts } from '@/features/cart/api/getCartProducts';
import { postCartProductAdd } from '@/features/cart/api/postCartProductAdd';

import { getCartCount } from '../api/getCartCount';
import type {
  CartProductAddRequest,
  CartProductDeleteRequest,
} from '../api/models';

export const cartQueries = {
  all: ['cart'] as const,
  countKey: () => [...cartQueries.all, 'count'] as const,
  productsKey: () => [...cartQueries.all, 'products'] as const,
  productsQuery: () =>
    queryOptions({
      queryKey: [...cartQueries.productsKey()],
      queryFn: () => getCartProducts(),
    }),
  countQuery: () =>
    queryOptions({
      queryKey: [...cartQueries.countKey()],
      queryFn: () => getCartCount(),
    }),
  addItemMutation: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (data: CartProductAddRequest) => postCartProductAdd(data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [...cartQueries.productsKey()],
        });
        queryClient.invalidateQueries({
          queryKey: [...cartQueries.countKey()],
        });
      },
    }),
  deleteItemMutation: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (data: CartProductDeleteRequest) => deleteCartProduct(data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [...cartQueries.productsKey()],
        });
        queryClient.invalidateQueries({
          queryKey: [...cartQueries.countKey()],
        });
      },
    }),
};
