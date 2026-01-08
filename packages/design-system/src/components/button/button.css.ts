import { vars } from '../../shared/config/vars.css';
import { recipe } from '@vanilla-extract/recipes';

export type ButtonVariants = NonNullable<Parameters<typeof buttonVariant>[0]>;
export type ButtonSize = ButtonVariants['size'];
export type ButtonColor = ButtonVariants['color'];

export const buttonVariant = recipe({
  base: {
    borderRadius: 16,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  variants: {
    size: {
      large: {
        height: 54,
        fontFamily: vars.typography.fontFamily.primary,
        ...vars.typography.body.b1,
      },
    },
    color: {
      active: { backgroundColor: vars.colors.blue80, color: vars.colors.white },
      cancelled: { backgroundColor: 'transparent', color: vars.colors.gray60 },
      disabled: {
        backgroundColor: vars.colors.gray10,
        color: vars.colors.gray50,
      },
    },
  },
  defaultVariants: {
    size: 'large',
    color: 'active',
  },
});
