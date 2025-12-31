import {
  buttonVariant,
  type ButtonSize,
  type ButtonColor,
} from './button.css.ts';

export interface ButtonProps {
  size?: ButtonSize;
  color?: ButtonColor;
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
