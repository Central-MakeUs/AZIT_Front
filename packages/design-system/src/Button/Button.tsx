import type { Size, Variant } from '../shared/types/variant';
import { buttonVariant } from './button.css';

export interface ButtonProps {
  size?: Size;
  color?: Variant;
  label: string;
  onClick?: () => void;
}

export default function Button({
  size = 'medium',
  color = 'primary',
  label,
  ...props
}: ButtonProps) {
  return (
    <button type="button" className={buttonVariant({ size, color })} {...props}>
      {label}
    </button>
  );
}
