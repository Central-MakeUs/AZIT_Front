import { useInfiniteQuery } from '@tanstack/react-query';

import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import { orderQueries } from '@/shared/queries/order';

import type { OrderListItem } from '@/entities/order/model';

export interface UseOrderHistoryOptions {
  onOrderDetail?: (orderNumber: string) => void;
}

export function useOrderHistory(options: UseOrderHistoryOptions = {}) {
  const { onOrderDetail } = options;

  const {
    data: orderHistoryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery(orderQueries.orderHistoryInfiniteQuery());

  const { scrollRef, bottomSentinelRef } = useInfiniteScroll({
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
  });

  const orders: OrderListItem[] =
    orderHistoryData?.pages.flatMap((page) =>
      page.ok && page.data?.result?.content ? page.data.result.content : []
    ) ?? [];

  const isEmpty = !isPending && orders.length === 0;

  const handleOrderDetail = (order: OrderListItem) => {
    const id = order.orderNumber?.replace(/^#/, '');
    if (id) onOrderDetail?.(id);
  };

  return {
    orders,
    isPending,
    isEmpty,
    scrollRef,
    bottomSentinelRef,
    handlers: {
      handleOrderDetail,
    },
  };
}
