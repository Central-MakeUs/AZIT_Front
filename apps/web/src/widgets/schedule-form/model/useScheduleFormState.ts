import { useCallback, useEffect, useState } from 'react';

import {
  isScheduleDateTimeInPast,
  isScheduleFormValid,
  type ScheduleFormValues,
} from '@/widgets/schedule-form/model/scheduleForm';

import { useScheduleLocationSelectionStore } from '@/shared/store/scheduleLocationSelection';
import { toastError } from '@/shared/ui/toast';

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

  const validateForm = useCallback(() => {
    const { date, amPm, hour, minute } = formValues;

    if (isScheduleDateTimeInPast(date, amPm, hour, minute)) {
      toastError('이미 지난 시간은 설정할 수 없습니다');
      return false;
    }

    if (!isScheduleFormValid(formValues)) {
      return false;
    }

    return true;
  }, [formValues]);

  return {
    formValues,
    setFormValues,
    validateForm,
  };
};
