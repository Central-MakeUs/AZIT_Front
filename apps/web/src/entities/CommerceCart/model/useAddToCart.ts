import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { showCartError } from '@/shared/lib/showCartError';

import type { CartProductAddRequest } from './cart.types';

import { postCartProductAdd } from '@/entities/CommerceCart/api/postCartProductAdd';

interface HandleAddItemOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  const addItemMutation = useMutation({
    mutationFn: (data: CartProductAddRequest) => postCartProductAdd(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

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
