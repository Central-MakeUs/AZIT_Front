import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../shared/config/vars.css';

export type IconColor = NonNullable<Parameters<typeof iconVariant>[0]>['color'];

export const iconVariant = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  variants: {
    color: {
      primary: {
        color: vars.colors.blue80,
      },
      secondary: {
        color: vars.colors.gray30,
      },
      default: {
        color: vars.colors.black,
      },
    },
  },
  defaultVariants: {
    color: 'default',
  },
});
