import { create } from 'zustand';

export interface SelectedAddress {
  zipcode: string;
  baseAddress: string;
  extraAddress: string;
}

interface AddressSelectionState {
  selectedAddress: SelectedAddress | null;
  setSelectedAddress: (address: SelectedAddress) => void;
  clearAddress: () => void;
}

export const useAddressSelectionStore = create<AddressSelectionState>(
  (set) => ({
    selectedAddress: null,
    setSelectedAddress: (selectedAddress) => set({ selectedAddress }),
    clearAddress: () => set({ selectedAddress: null }),
  })
);
