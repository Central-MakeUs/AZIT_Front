import {
  getCheckoutInfoCart,
  getCheckoutInfoDirect,
} from '@/features/order/api';
import type {
  CartOrderCheckoutRequest,
  DirectOrderCheckoutRequest,
} from '@/features/order/api/types';
import { queryOptions } from '@tanstack/react-query';

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
};
