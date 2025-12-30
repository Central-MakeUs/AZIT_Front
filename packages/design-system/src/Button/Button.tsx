import type { Size, Variant } from '../shared/types/variant';
import { colorVariant, sizeVariant } from './button.css';

export interface ButtonProps {
  size?: Size;
  variant?: Variant;
  label: string;
  onClick?: () => void;
}

export const Button = ({
  size = 'medium',
  variant = 'primary',
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={sizeVariant[size] + ' ' + colorVariant[variant]}
      {...props}
    >
      {label}
    </button>
  );
};
