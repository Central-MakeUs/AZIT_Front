import { create } from 'zustand';
import type { Order } from '../types/order';

interface OrderState {
  order: Partial<Order> | null;
  isDirectOrder: boolean;
  setDirectOrder: (product: Pick<Order, 'skuId' | 'quantity'>) => void;
  setIsDirectOrder: (isDirectOrder: boolean) => void;
  resetOrder: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  order: null,
  isDirectOrder: false,
  setDirectOrder: (product) =>
    set((state) => ({
      order: { ...state.order, ...product },
    })),
  setIsDirectOrder: (isDirectOrder) => set({ isDirectOrder }),
  resetOrder: () => set({ order: null }),
}));
