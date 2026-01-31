import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
  padding: '20px 20px 24px',
  backgroundColor: vars.colors.white,
});

export const profileRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 12,
});

export const avatar = style({
  width: 64,
  height: 64,
  borderRadius: '50%',
  backgroundColor: vars.colors.gray10,
  flexShrink: 0,
});

export const profileInfo = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 8,
  flex: 1,
  minWidth: 0,
});

export const nickname = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const statGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 8,
  width: '100%',
});
