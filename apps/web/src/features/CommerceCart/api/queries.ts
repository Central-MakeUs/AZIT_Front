import {
  queryOptions,
  mutationOptions,
  type QueryClient,
} from '@tanstack/react-query';

import { deleteCartProduct } from './deleteCartProduct';
import { updateCartProductQuantity } from './updateCartProductQuantity';

import { getCartCount } from '@/entities/CommerceCart/api/getCartCount';
import { getCartProducts } from '@/entities/CommerceCart/api/getCartProducts';
import { postCartProductAdd } from '@/entities/CommerceCart/api/postCartProductAdd';
import type {
  CartProductAddRequest,
  CartProductDeleteRequest,
  CartProductUpdateQuantityRequest,
} from '@/entities/CommerceCart/model';


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
      }) => updateCartProductQuantity(cartItemId, data),
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
