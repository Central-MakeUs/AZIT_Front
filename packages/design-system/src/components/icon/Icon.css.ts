import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../shared/styles/theme.css';
import { createVar, style } from '@vanilla-extract/css';

export type IconColor = NonNullable<Parameters<typeof iconVariant>[0]>['color'];

export const iconColorVar = createVar();

export const iconVariant = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: iconColorVar,
  },
  variants: {
    color: {
      primary: {
        vars: {
          [iconColorVar]: vars.colors.blue80,
        },
      },
      secondary: {
        vars: {
          [iconColorVar]: vars.colors.gray30,
        },
      },
      default: {
        vars: {
          [iconColorVar]: vars.colors.black,
        },
      },
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

export const iconColor = style({
  vars: {
    [iconColorVar]: vars.colors.gray40,
  },
});
