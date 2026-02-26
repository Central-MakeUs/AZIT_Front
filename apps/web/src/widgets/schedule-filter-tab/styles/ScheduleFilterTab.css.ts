import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const tabsContainer = style({
  display: 'flex',
  gap: '6px',
  width: '100%',
  backgroundColor: vars.colors.background_sub,
});
