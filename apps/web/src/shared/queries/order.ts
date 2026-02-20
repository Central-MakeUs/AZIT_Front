import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query';

import { postOrderCancel } from '@/features/order/api/postOrderCancel';
import { postOrderCreate } from '@/features/order/api/postOrderCreate';

import { getOrderDetail } from '@/entities/order/api/getOrderDetail';
import { getOrderFromCart } from '@/entities/order/api/getOrderFromCart';
import { getOrderFromDirect } from '@/entities/order/api/getOrderFromDirect';
import { getOrderHistory } from '@/entities/order/api/getOrderHistory';
import type {
  CartOrderCheckoutRequest,
  DirectOrderCheckoutRequest,
  OrderRequest,
} from '@/entities/order/model';

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
        if (!lastPage.ok || !lastPage.data?.result) return undefined;
        const { hasNext, lastId } = lastPage.data.result;
        return hasNext && lastId ? lastId : undefined;
      },
    }),
  cancelOrderMutation: (orderNumber: string) =>
    mutationOptions({
      mutationFn: () => postOrderCancel(orderNumber),
    }),
};
