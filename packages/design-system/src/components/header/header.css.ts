import { style } from '@vanilla-extract/css';
import { vars } from '../../shared/styles/theme.css';
import { typography } from '../../shared/styles';

export const header = style({
  padding: 10,
  paddingRight: 20,
  paddingLeft: 20,
  borderRadius: 16,
  border: 'none',
  display: 'grid',
  width: '100%',
  gridTemplateColumns: '1fr 3fr 1fr',
  backgroundColor: vars.colors.background,
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
