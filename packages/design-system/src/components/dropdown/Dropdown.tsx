import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '../icon';
import * as styles from './Dropdown.css';
import type { DropdownOption } from './model/types';

export type { DropdownOption } from './model/types';

export interface DropdownProps {
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Dropdown({
  placeholder = '선택해주세요',
  options,
  value,
  onValueChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(value);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const displayText = selectedOption?.label || placeholder;
  const isPlaceholder = !selectedOption;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: DropdownOption) => {
    setSelectedValue(option.value);
    onValueChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={styles.dropdownContainer}>
      <button
        type="button"
        className={styles.dropdownTrigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={isPlaceholder ? styles.placeholder : styles.selectedValue}
        >
          {displayText}
        </span>
        <span
          className={`${styles.iconWrapper} ${isOpen ? styles.iconOpen : ''}`}
        >
          <ChevronDownIcon />
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdownContent}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.dropdownItem} ${
                selectedValue === option.value
                  ? styles.dropdownItemSelected
                  : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
