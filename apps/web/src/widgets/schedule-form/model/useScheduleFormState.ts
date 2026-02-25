// useScheduleFormValues.ts
import { useEffect, useState } from 'react';

import {
  isScheduleFormValid,
  type ScheduleFormValues,
} from '@/widgets/schedule-form/model/scheduleForm';

import { useScheduleLocationSelectionStore } from '@/shared/store/scheduleLocationSelection';

export const useScheduleFormState = (initialValues: ScheduleFormValues) => {
  const [formValues, setFormValues] =
    useState<ScheduleFormValues>(initialValues);

  const selectedLocation = useScheduleLocationSelectionStore(
    (state) => state.selectedLocation
  );
  const clearLocation = useScheduleLocationSelectionStore(
    (state) => state.clearLocation
  );
  useEffect(() => {
    if (!selectedLocation) return;

    setFormValues((prev) => ({
      ...prev,
      ...selectedLocation,
    }));
    clearLocation();
  }, [selectedLocation, clearLocation]);

  const isValid = isScheduleFormValid(formValues);

  return {
    formValues,
    setFormValues,
    isValid,
  };
};
