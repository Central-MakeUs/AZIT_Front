import {
  queryOptions,
  mutationOptions,
  type QueryClient,
} from '@tanstack/react-query';

import { deleteCartProduct } from '@/features/cart/api/deleteCartProduct';
import { getCartProducts } from '@/features/cart/api/getCartProducts';
import { patchCartProductQuantity } from '@/features/cart/api/patchCartProductQuantity';
import { postCartProductAdd } from '@/features/cart/api/postCartProductAdd';

import { getCartCount } from '@/shared/api/handlers/getCartCount';
import type {
  CartProductAddRequest,
  CartProductDeleteRequest,
  CartProductUpdateQuantityRequest,
} from '@/shared/api/models/cart';

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
  changeItemQuantityMutation: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: ({
        cartItemId,
        data,
      }: {
        cartItemId: number;
        data: CartProductUpdateQuantityRequest;
      }) => patchCartProductQuantity(cartItemId, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [...cartQueries.productsKey()],
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
