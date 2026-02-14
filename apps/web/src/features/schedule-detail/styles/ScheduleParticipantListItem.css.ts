import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const item = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 6,
  padding: '12px 8px',
  flexShrink: 0,
});

export const avatar = style({
  width: 48,
  height: 48,
  borderRadius: '50%',
  backgroundColor: vars.colors.gray10,
  flexShrink: 0,
});

export const nickname = style([
  typography.body.b4,
  {
    color: vars.colors.black,
    textAlign: 'center',
    maxWidth: 64,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
]);
