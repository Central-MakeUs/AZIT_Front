import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { buttonVariant, type ButtonSize, type ButtonColor } from './button.css';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  size?: ButtonSize;
  color?: ButtonColor;
  children: ReactNode;
  onClick?: () => void;
}

export function Button({
  width,
  size,
  color,
  children,
  type = 'button',
  onClick,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(buttonVariant({ size, color }), className)}
      style={width ? { width } : undefined}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
