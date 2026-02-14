import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { showCartError } from '@/features/cart/lib/showCartError';

import type { CartProductAddRequest } from '@/shared/api/models/cart';
import { cartQueries } from '@/shared/queries/cart';

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
          onError: () => {
            // TODO: 토스트 메시지로 에러 처리하기
          },
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

// 장바구니 추가만 필요한 페이지(상품 상세 등)에서 CartProvider 없이 사용할 수 있도록 분리
export function useAddToCart() {
  const queryClient = useQueryClient();
  const addItemMutation = useMutation(cartQueries.addItemMutation(queryClient));

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

  const addItemAsync = useCallback(
    (data: CartProductAddRequest) => addItemMutation.mutateAsync(data),
    [addItemMutation]
  );

  return {
    handleAddItem,
    addItemAsync,
    isPending: addItemMutation.isPending,
  };
}
