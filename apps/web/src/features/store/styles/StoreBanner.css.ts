import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const banner = style({
  width: '100%',
  height: '130px',
  borderRadius: '12px',
  background:
    'linear-gradient(110.083deg, rgba(0, 94, 237, 0.6) 2.3182%, rgba(0, 94, 237, 0.48) 34.31%, rgba(150, 201, 101, 0.48) 66.765%, rgba(216, 249, 41, 0.6) 96.439%)',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: vars.elevation.level1,
});

export const bannerTitle = style([
  typography.heading.h2,
  {
    position: 'absolute',
    left: '24px',
    top: '24px',
    color: vars.colors.white,
  },
]);

export const bannerDescription = style([
  typography.body.b1,
  {
    position: 'absolute',
    left: '24px',
    top: '64px',
    color: vars.colors.white,
  },
]);
