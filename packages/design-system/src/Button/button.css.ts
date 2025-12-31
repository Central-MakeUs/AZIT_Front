import { vars } from '../shared/config/vars.css';
import { recipe } from '@vanilla-extract/recipes';

export type ButtonVariants = NonNullable<Parameters<typeof buttonVariant>[0]>;
export type ButtonSize = ButtonVariants['size'];
export type ButtonColor = ButtonVariants['color'];

export const buttonVariant = recipe({
  base: {
    borderRadius: 8,
    border: 'none',
    backgroundColor: vars.colors.blue40,
  },
  variants: {
    size: {
      small: { padding: 8 },
      medium: { padding: 12 },
      large: { padding: 16 },
    },
    color: {
      primary: { backgroundColor: vars.colors.blue40 },
      secondary: { backgroundColor: vars.colors.secondary },
    },
  },
  defaultVariants: {
    size: 'medium',
    color: 'primary',
  },
});
