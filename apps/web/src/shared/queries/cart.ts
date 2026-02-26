import {
  queryOptions,
  mutationOptions,
  type QueryClient,
} from '@tanstack/react-query';

import { deleteCartProduct } from '@/features/cart/api/deleteCartProduct';
import { patchCartProductQuantity } from '@/features/cart/api/patchCartProductQuantity';
import { postCartProductAdd } from '@/features/cart/api/postCartProductAdd';

import { getCartCount } from '@/entities/cart/api/getCartCount';
import { getCartProducts } from '@/entities/cart/api/getCartProducts';
import type {
  CartProductAddRequest,
  CartProductDeleteRequest,
  CartProductUpdateQuantityRequest,
} from '@/entities/cart/model';

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
          queryKey: [...cartQueries.all],
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
