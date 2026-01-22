import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const banner = style({
  width: '100%',
  height: '60px',
  borderRadius: '12px',
  background:
    'linear-gradient(128.385deg, rgba(0, 94, 237, 0.6) 2.3182%, rgba(0, 94, 237, 0.48) 34.31%, rgba(150, 201, 101, 0.48) 66.765%, rgba(216, 249, 41, 0.6) 96.439%)',
  position: 'relative',
  overflow: 'hidden',
});

export const bannerText = style({
  position: 'absolute',
  left: '23px',
  top: '17px',
  fontSize: vars.typography.body.b1.fontSize,
  fontWeight: vars.typography.body.b1.fontWeight,
  lineHeight: vars.typography.body.b1.lineHeight,
  color: vars.colors.white,
  textShadow: vars.elevation.level1,
});
