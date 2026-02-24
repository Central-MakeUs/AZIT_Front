import type { InputHTMLAttributes, ReactNode } from 'react';
import { inputContainer, input, iconSlot, type InputState } from './Input.css';
import { clsx } from 'clsx';

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  state?: Exclude<InputState, 'disabled'>;
  icon?: ReactNode;
}

export function Input({
  state = 'default',
  icon,
  type = 'text',
  className,
  disabled,
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
    </div>
  );
}
