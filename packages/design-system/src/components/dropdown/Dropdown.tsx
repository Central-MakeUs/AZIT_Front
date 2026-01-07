import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';
import * as styles from './dropdown.css';
import { ChevronDownIcon, CheckIcon } from './icon';
import { useDropdown } from './model/useDropdown';
import type { DropdownOption } from './model/types';

export type { DropdownOption } from './model/types';

export interface DropdownProps extends Omit<
  ComponentPropsWithoutRef<typeof DropdownMenu.Root>,
  'onValueChange' | 'value'
> {
  width?: string;
  options?: DropdownOption[];
  placeholder?: string;
  className?: string;
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
      width,
      options,
      placeholder = '지역을 선택해주세요',
      className,
      value,
      defaultValue,
      onValueChange,
      ...props
    },
    ref
  ) => {
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
      <DropdownMenu.Root {...props} open={open} onOpenChange={handleOpenChange}>
        <DropdownMenu.Trigger
          ref={ref}
          className={`${styles.dropdownTrigger} ${className || ''}`}
          style={width ? { width } : undefined}
          asChild={false}
        >
          <span
            className={
              isPlaceholder ? styles.dropdownPlaceholder : styles.dropdownValue
            }
          >
            {displayText}
          </span>
          <span
            className={`${styles.dropdownIcon} ${open ? styles.dropdownIconOpen : ''}`}
          >
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
                <span className={styles.dropdownItemText}>{option.label}</span>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
