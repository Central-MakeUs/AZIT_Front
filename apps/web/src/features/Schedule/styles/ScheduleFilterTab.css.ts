import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const tabsContainer = style({
  display: 'flex',
  gap: '6px',
  width: '100%',
  backgroundColor: vars.colors.background_sub,
});

export const activeButton = style({
  backgroundColor: vars.colors.blue100,
});

export const inactiveButton = style({
  border: 'none',
});
