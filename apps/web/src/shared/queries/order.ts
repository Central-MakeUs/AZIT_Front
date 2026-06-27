import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query';

import { postOrderCancel } from '@/features/CommerceOrder/api/postOrderCancel';
import { postOrderCreate } from '@/features/CommerceOrder/api/postOrderCreate';

import { getOrderDetail } from '@/entities/CommerceOrder/api/getOrderDetail';
import { getOrderFromCart } from '@/entities/CommerceOrder/api/getOrderFromCart';
import { getOrderFromDirect } from '@/entities/CommerceOrder/api/getOrderFromDirect';
import { getOrderHistory } from '@/entities/CommerceOrder/api/getOrderHistory';
import type {
  CartOrderCheckoutRequest,
  DirectOrderCheckoutRequest,
  OrderRequest,
} from '@/entities/CommerceOrder/model';

export const orderQueries = {
  all: ['order'] as const,
  checkoutDirectQuery: (data: DirectOrderCheckoutRequest) =>
    queryOptions({
      queryKey: [...orderQueries.all, 'checkoutDirect'],
      queryFn: () => getOrderFromDirect(data),
    }),
  checkoutCartQuery: (data: CartOrderCheckoutRequest) =>
    queryOptions({
      queryKey: [...orderQueries.all, 'checkoutCart'],
      queryFn: () => getOrderFromCart(data),
    }),
  createOrderMutation: () =>
    mutationOptions({
      mutationFn: (data: OrderRequest) => postOrderCreate(data),
    }),
  getOrderDetailQuery: (orderNumber: string) =>
    queryOptions({
      queryKey: [...orderQueries.all, 'orderDetail', orderNumber],
      queryFn: () => getOrderDetail(orderNumber),
    }),
  orderHistoryInfiniteQuery: () =>
    infiniteQueryOptions({
      queryKey: [...orderQueries.all, 'orderHistory'],
      queryFn: ({ pageParam }) => getOrderHistory(pageParam),
      initialPageParam: undefined as number | undefined,
      getNextPageParam: (lastPage) => {
        if (!lastPage.result) return undefined;
        const { hasNext, lastId } = lastPage.result;
        return hasNext && lastId ? lastId : undefined;
      },
    }),
  cancelOrderMutation: (orderNumber: string) =>
    mutationOptions({
      mutationFn: () => postOrderCancel(orderNumber),
    }),
};
