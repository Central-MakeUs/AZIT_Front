import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  width: '100%',
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '32px',
  width: '100%',
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  color: vars.colors.black,
});

export const title = style([
  typography.heading.h3,
  {
    textAlign: 'center',
    width: '100%',
  },
]);

export const description = style([
  typography.body.b2,
  {
    width: '100%',
    color: vars.colors.gray60,
    textWrap: 'nowrap',
    textAlign: 'center',
  },
]);

export const orderNumber = style([
  typography.body.b2,
  {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    textWrap: 'nowrap',
  },
]);

export const orderNumberValue = style({
  color: vars.colors.blue60,
});

export const buttonWrapper = style({
  width: '260px',
  height: '44px',
});
