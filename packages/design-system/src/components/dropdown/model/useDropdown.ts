import { useState, useEffect } from 'react';
import type { DropdownOption } from './types';

interface UseDropdownProps {
  value?: string;
  defaultValue?: string;
  options?: DropdownOption[];
  placeholder?: string;
  open?: boolean;
  onValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
}

export const useDropdown = ({
  value,
  defaultValue,
  options,
  placeholder,
  open: controlledOpen,
  onValueChange,
  onOpenChange,
}: UseDropdownProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [open, setOpen] = useState(controlledOpen ?? false);

  const selectedValue = value !== undefined ? value : internalValue;

  const selectedOption = options?.find(
    (option: DropdownOption) => option.value === selectedValue
  );
  const displayText = selectedOption ? selectedOption.label : placeholder;
  const isPlaceholder = !selectedOption;

  useEffect(() => {
    if (controlledOpen !== undefined) {
      setOpen(controlledOpen);
    }
  }, [controlledOpen]);

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return {
    open,
    selectedValue,
    displayText,
    isPlaceholder,
    handleValueChange,
    handleOpenChange,
  };
};
