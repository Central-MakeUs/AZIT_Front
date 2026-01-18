import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef, useId } from 'react';
import * as styles from './dropdown.css';
import { ChevronDownIcon, CheckIcon } from './icon';
import { useDropdown } from './model/useDropdown';
import type { DropdownOption } from './model/types';

export type { DropdownOption } from './model/types';

export interface DropdownProps extends Omit<
  ComponentPropsWithoutRef<typeof DropdownMenu.Root>,
  'onValueChange' | 'value'
> {
  label?: string;
  width?: string;
  options?: DropdownOption[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const Dropdown = forwardRef<
  ElementRef<typeof DropdownMenu.Trigger>,
  DropdownProps
>(
  (
    {
      label,
      width,
      options,
      placeholder = '지역을 선택해주세요',
      value,
      defaultValue,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const id = useId();
    const {
      open,
      selectedValue,
      displayText,
      isPlaceholder,
      handleValueChange,
      handleOpenChange,
    } = useDropdown({
      value,
      defaultValue,
      options,
      placeholder,
      open: props.open,
      onValueChange,
      onOpenChange: props.onOpenChange,
    });

    return (
      <>
        {label && (
          <label htmlFor={id} className={styles.dropdownLabel}>
            {label}
          </label>
        )}
        <DropdownMenu.Root
          {...props}
          open={open}
          onOpenChange={handleOpenChange}
        >
          <DropdownMenu.Trigger
            ref={ref}
            id={id}
            className={styles.dropdownTrigger}
            style={width ? { width } : undefined}
            asChild={false}
          >
            <span
              className={
                isPlaceholder
                  ? styles.dropdownPlaceholder
                  : styles.dropdownValue
              }
            >
              {displayText}
            </span>
            <span className={styles.dropdownIcon({ open })}>
              <ChevronDownIcon />
            </span>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className={styles.dropdownContent}
              align="start"
              sideOffset={4}
            >
              {options?.map((option: DropdownOption) => (
                <DropdownMenu.Item
                  key={option.value}
                  disabled={option.disabled}
                  className={styles.dropdownItem}
                  onSelect={(e) => {
                    e.preventDefault();
                    handleValueChange(option.value);
                  }}
                >
                  {selectedValue === option.value && (
                    <span className={styles.dropdownItemIndicator}>
                      <CheckIcon />
                    </span>
                  )}
                  <span className={styles.dropdownItemText}>
                    {option.label}
                  </span>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export { Dropdown };
