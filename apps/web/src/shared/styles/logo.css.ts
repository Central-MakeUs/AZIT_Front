import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const logo = style({
  fontFamily: 'Tilt Warp, sans-serif',
  fontSize: '24px',
  lineHeight: '1.4',
  color: vars.colors.black,
  letterSpacing: '2.5px',
  fontVariationSettings: "'XROT' 0, 'YROT' 0",
});
