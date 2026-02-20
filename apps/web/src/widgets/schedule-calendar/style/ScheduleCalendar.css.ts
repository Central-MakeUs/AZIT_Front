import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const calendarContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const calendarTitle = style([
  typography.body.b1,
  {
    color: vars.colors.black,
    textAlign: 'center',
  },
]);

export const calendarHeaderSection = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '32px',
  marginBottom: '16px',
});

export const calendarButtonWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
});

export const calendarHeaderButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
});

export const lightningTile = style({
  width: '6px',
  height: '6px',
  backgroundColor: vars.colors.secondary,
  borderRadius: '100%',
});

export const regularTile = style({
  width: '6px',
  height: '6px',
  backgroundColor: vars.colors.blue60,
  borderRadius: '100%',
});

export const tileContainer = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2px',
});
