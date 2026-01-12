import type { InputHTMLAttributes, ReactNode } from 'react';
import { inputContainer, input, iconSlot, type InputState } from './input.css';
import { clsx } from 'clsx';

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  state?: Exclude<InputState, 'disabled'>;
  icon?: ReactNode;
}

export default function Input({
  state = 'default',
  icon,
  className,
  disabled,
  ...props
}: InputProps) {
  const currentState = disabled ? 'disabled' : state;

  return (
    <div className={clsx(inputContainer({ state: currentState }), className)}>
      {icon && <div className={iconSlot}>{icon}</div>}
      <input type="text" className={input} disabled={disabled} {...props} />
    </div>
  );
}
