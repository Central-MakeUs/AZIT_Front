import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const footerWrapper = style({
  flexShrink: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',
  backgroundColor: vars.colors.white,
  padding: '20px',
});
