import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const tabsContainer = style({
  display: 'flex',
  gap: '6px',
  width: '100%',
  padding: '16px 20px',
  position: 'sticky',
  top: 0,
  backgroundColor: vars.colors.background_sub,
});
