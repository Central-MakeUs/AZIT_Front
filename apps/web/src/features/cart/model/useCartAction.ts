import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { cartQueries } from '@/shared/queries/cart';

interface UseCartActionParams {
  selectedItemIds: Set<string>;
  setSelectedItemIds: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export function useCartAction({
  selectedItemIds,
  setSelectedItemIds,
}: UseCartActionParams) {
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation(
    cartQueries.addItemMutation(queryClient)
  );

  const deleteItemMutation = useMutation(
    cartQueries.deleteItemMutation(queryClient)
  );

  const handleQuantityChange = useCallback(
    (itemId: number, productSkuId: number, quantity: number) => {
      addToCartMutation.mutate(
        {
          productId: itemId,
          productSkuId: productSkuId,
          quantity: quantity,
        },
        {
          onSuccess: () => {},
          onError: () => {
            // TODO: 토스트 메시지로 에러 처리하기
          },
        }
      );
    },
    [addToCartMutation]
  );

  const handleDeleteItem = useCallback(
    (itemId: string) => {
      deleteItemMutation.mutate(
        { cartItemIds: [Number(itemId)] },
        {
          onSuccess: () => {
            setSelectedItemIds((prev) => {
              const next = new Set(prev);
              next.delete(itemId);
              return next;
            });
          },
        }
      );
    },
    [deleteItemMutation, setSelectedItemIds]
  );

  const handleDeleteSelected = useCallback(() => {
    if (selectedItemIds.size === 0) return;
    const cartItemIds = Array.from(selectedItemIds, Number);
    deleteItemMutation.mutate(
      { cartItemIds },
      {
        onSuccess: () => {
          setSelectedItemIds(new Set());
        },
      }
    );
  }, [deleteItemMutation, selectedItemIds, setSelectedItemIds]);

  return {
    handleQuantityChange,
    handleDeleteItem,
    handleDeleteSelected,
  };
}
