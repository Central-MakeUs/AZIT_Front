import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { buttonVariant, type ButtonSize, type ButtonColor } from './Button.css';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  size?: ButtonSize;
  state?: ButtonColor;
  children: ReactNode;
  onClick?: () => void;
}

export function Button({
  width,
  size,
  state,
  children,
  type = 'button',
  onClick,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(buttonVariant({ size, state }), className)}
      style={width ? { width } : undefined}
      onClick={onClick}
      {...props}
      disabled={state === 'disabled'}
    >
      {children}
    </button>
  );
}
