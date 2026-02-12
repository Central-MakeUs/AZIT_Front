import {
  getCheckoutInfoCart,
  getCheckoutInfoDirect,
} from '@/features/order/api';
import { postOrderCreate } from '@/features/order/api/postOrderCreate';
import type {
  CartOrderCheckoutRequest,
  DirectOrderCheckoutRequest,
  OrderRequest,
} from '@/features/order/api/types';
import { mutationOptions, queryOptions } from '@tanstack/react-query';

export const orderQueries = {
  all: ['order'] as const,
  checkoutDirectQuery: (data: DirectOrderCheckoutRequest) =>
    queryOptions({
      queryKey: [...orderQueries.all, 'checkoutDirect'],
      queryFn: () => getCheckoutInfoDirect(data),
    }),
  checkoutCartQuery: (data: CartOrderCheckoutRequest) =>
    queryOptions({
      queryKey: [...orderQueries.all, 'checkoutCart'],
      queryFn: () => getCheckoutInfoCart(data),
    }),
  createOrderMutation: () =>
    mutationOptions({
      mutationFn: (data: OrderRequest) => postOrderCreate(data),
    }),
};
