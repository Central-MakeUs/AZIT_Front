import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { buttonVariant, type ButtonSize, type ButtonColor } from './button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  size?: ButtonSize;
  color?: ButtonColor;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({
  width,
  size,
  color,
  children,
  className,
  type = 'button',
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariant({ size, color }) + ' ' + className}
      style={width ? { width } : undefined}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
