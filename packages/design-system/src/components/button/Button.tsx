import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { buttonVariant, type ButtonSize, type ButtonColor } from './button.css';

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
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariant({ size, color })}
      style={width ? { width } : undefined}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
