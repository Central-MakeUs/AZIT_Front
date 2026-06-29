import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
  margin: '20px 0',
  // border: `1px solid red`,
  // marginBottom: 20,
});

export const brandHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const brandName = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const itemsWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
});
