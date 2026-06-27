import type { InputHTMLAttributes, ReactNode } from 'react';
import {
  inputContainer,
  input,
  iconSlot,
  removeButton,
  type InputState,
  inputWrapper,
  inputDescriptionWrapper,
  inputDescriptionWarning,
  inputDescription,
  removeButtonIcon,
} from './Input.css';
import XIcon from '../icon/XIcon';
import { clsx } from 'clsx';

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  state?: Exclude<InputState, 'disabled'>;
  icon?: ReactNode;
  onRemove?: () => void;
}

interface InputDescriptionProps {
  left?: ReactNode;
  right?: ReactNode;
}

export function Input({
  state = 'default',
  icon,
  onRemove,
  type = 'text',
  className,
  disabled,
  children,
  ...props
}: InputProps) {
  const currentState = disabled ? 'disabled' : state;

  const autoInputProps: InputHTMLAttributes<HTMLInputElement> = {
    type,
  };

  if (type === 'number') {
    autoInputProps.inputMode = 'numeric';
    autoInputProps.pattern = '[0-9]*';
    autoInputProps.onInput = (event) => {
      const target = event.target as HTMLInputElement;
      target.value = target.value.replace(/[^0-9]/g, '');
    };
  }

  return (
    <div className={inputWrapper}>
      <div className={clsx(inputContainer({ state: currentState }), className)}>
        {icon && <div className={iconSlot}>{icon}</div>}
        <input
          style={{ backgroundColor: 'inherit' }}
          type={type}
          className={input}
          disabled={disabled}
          autoComplete="off"
          {...autoInputProps}
          {...props}
        />
        {onRemove && (
          <button type="button" className={removeButton} onClick={onRemove}>
            <XIcon size={16} className={removeButtonIcon} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function InputDescription({ left, right }: InputDescriptionProps) {
  return (
    <p className={inputDescriptionWrapper}>
      {left && <span className={inputDescriptionWarning}>{left}</span>}
      {right && <span className={inputDescription}>{right}</span>}
    </p>
  );
}

Input.Description = InputDescription;
