import { style } from '@vanilla-extract/css';
import { vars } from '../../shared/config/vars.css';

export const header = style({
  padding: 10,
  paddingRight: 20,
  paddingLeft: 20,
  borderRadius: 16,
  border: 'none',
  display: 'grid',
  minWidth: 375,
  gridTemplateColumns: '1fr 3fr 1fr',
});

export const headerLeft = style({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'nowrap',
});

export const headerCenter = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...vars.typography.body.b1,
  flexWrap: 'nowrap',
});

export const headerRight = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  flexWrap: 'nowrap',
});
