import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const banner = style({
  width: '100%',
  minHeight: '100px',
  borderRadius: '12px',
  padding: 20,
  background:
    'linear-gradient(110.083deg, rgba(0, 94, 237, 0.6) 2.3182%, rgba(0, 94, 237, 0.48) 34.31%, rgba(150, 201, 101, 0.48) 66.765%, rgba(216, 249, 41, 0.6) 96.439%)',
  overflow: 'hidden',
});

export const bannerTitle = style([
  typography.heading.h3,
  {
    color: vars.colors.white,
    marginBottom: 3,
  },
]);

export const bannerDescription = style([
  typography.body.b2,
  {
    width: '100%',
    color: vars.colors.white,
  },
]);
