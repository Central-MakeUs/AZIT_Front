import { getOrderDetail } from '@/features/order-detail/api/getOrderDetail';
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
import { postOrderCancel } from '@/pages/order-detail/api/postOrderCancel';
import { getOrderHistory } from '@/pages/order-history/api/getOrderHistory';
import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query';

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
