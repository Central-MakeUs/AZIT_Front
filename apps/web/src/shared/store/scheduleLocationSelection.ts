import { create } from 'zustand';

export interface SelectedScheduleLocation {
  address: string;
  locationName: string;
  detailedLocation: string;
  latitude: number;
  longitude: number;
}

interface ScheduleLocationSelectionState {
  selectedLocation: SelectedScheduleLocation | null;
  setSelectedLocation: (location: SelectedScheduleLocation) => void;
  clearLocation: () => void;
}

export const useScheduleLocationSelectionStore =
  create<ScheduleLocationSelectionState>((set) => ({
    selectedLocation: null,
    setSelectedLocation: (selectedLocation) => set({ selectedLocation }),
    clearLocation: () => set({ selectedLocation: null }),
  }));
