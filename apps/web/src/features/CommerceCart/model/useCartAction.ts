import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { cartQueries } from '@/features/CommerceCart/api/queries';

import { showCartError } from '@/shared/lib/showCartError';
import { toastError } from '@/shared/ui/toast';

import type { CartProductAddRequest } from '@/entities/CommerceCart/model';

interface HandleAddItemOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseCartActionParams {
  selectedItemIds: Set<string>;
  setSelectedItemIds: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export function useCartAction({
  selectedItemIds,
  setSelectedItemIds,
}: UseCartActionParams) {
  const queryClient = useQueryClient();

  const addItemMutation = useMutation(cartQueries.addItemMutation(queryClient));

  const changeItemQuantityMutation = useMutation(
    cartQueries.changeItemQuantityMutation(queryClient)
  );

  const deleteItemMutation = useMutation(
    cartQueries.deleteItemMutation(queryClient)
  );

  const handleAddItem = useCallback(
    (data: CartProductAddRequest, options?: HandleAddItemOptions) => {
      addItemMutation.mutate(data, {
        onSuccess: () => options?.onSuccess?.(),
        onError: (error) =>
          options?.onError?.(error as Error) ??
          showCartError(error instanceof Error ? error.message : undefined),
      });
    },
    [addItemMutation]
  );

  const handleQuantityChange = useCallback(
    (cartItemId: number, quantity: number) => {
      changeItemQuantityMutation.mutate(
        { cartItemId, data: { quantity } },
        {
          onSuccess: () => {},
          onError: (error) =>
            toastError(
              error instanceof Error
                ? error.message
                : '장바구니 수량 변경에 실패했습니다.'
            ),
        }
      );
    },
    [changeItemQuantityMutation]
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
    handleAddItem,
    isAddToCartPending: addItemMutation.isPending,
    handleQuantityChange,
    handleDeleteItem,
    handleDeleteSelected,
  };
}
