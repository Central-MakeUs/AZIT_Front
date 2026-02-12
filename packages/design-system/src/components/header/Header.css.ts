import { style } from '@vanilla-extract/css';
import { typography, vars } from '../../shared/styles';
import { recipe } from '@vanilla-extract/recipes';

export const header = recipe({
  base: {
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    border: 'none',
    height: '56px',
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '1fr 3fr 1fr',
    flexShrink: 0,
  },
  variants: {
    color: {
      transparent: {
        backgroundColor: 'transparent',
      },
      default: {
        backgroundColor: vars.colors.background,
      },
      sub: {
        backgroundColor: vars.colors.background_sub,
      },
    },
    sticky: {
      true: {
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 10,
      },
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

export const headerLeft = style({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'nowrap',
});

export const headerCenter = style([
  typography.body.b1,
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
]);

export const headerRight = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  flexWrap: 'nowrap',
});
