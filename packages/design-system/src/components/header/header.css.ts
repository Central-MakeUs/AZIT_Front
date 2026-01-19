import { style } from '@vanilla-extract/css';
import { vars } from '../../shared/styles/theme.css';
import { typography } from '../../shared/styles';
import { recipe } from '@vanilla-extract/recipes';

export const header = recipe({
  base: {
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 16,
    border: 'none',
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '1fr 3fr 1fr',
    backgroundColor: vars.colors.background,
  },
  variants: {
    sticky: {
      true: {
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 10,
      },
    },
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
