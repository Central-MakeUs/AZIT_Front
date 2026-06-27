import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  postDeliveryAddress,
  updateDeliveryAddress,
  deleteDeliveryAddress,
} from '@/features/Address/api';

import { getDeliveryAddresses } from '@/entities/Address/api/getDeliveryAddresses';
import type {
  RegisterDeliveryAddressRequest,
  UpdateDeliveryAddressRequest,
} from '@/entities/Address/model';

export const addressQueries = {
  all: ['shippingAddresses'] as const,
  listKey: () => [...addressQueries.all] as const,
  addressesQuery: () =>
    queryOptions({
      queryKey: [...addressQueries.listKey()],
      queryFn: () => getDeliveryAddresses(),
      staleTime: 1000 * 60 * 60 * 3, // 3시간,
    }),
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterDeliveryAddressRequest) =>
      postDeliveryAddress(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: addressQueries.listKey(),
      });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateDeliveryAddressRequest;
    }) => updateDeliveryAddress(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: addressQueries.listKey(),
      });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteDeliveryAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: addressQueries.listKey(),
      });
    },
  });
};
