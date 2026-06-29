import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '24px 16px',
  backgroundColor: vars.colors.blue70,
  borderRadius: 16,
});

export const avatar = style({
  width: 56,
  height: 56,
  borderRadius: '50%',
  backgroundColor: vars.colors.blue20,
  flexShrink: 0,
  objectFit: 'cover',
});

export const nicknameRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 2,
  flex: 1,
  minWidth: 0,
  marginLeft: 12,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
});

export const nickname = style([
  typography.body.b1,
  {
    color: vars.colors.white,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
]);

export const chevron = style({
  color: vars.colors.white,
  flexShrink: 0,
});

export const pointsBadge = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  padding: '6px 10px 6px 8px',
  backgroundColor: vars.colors.white,
  borderRadius: 8,
  flexShrink: 0,
});

export const pointsIcon = style({
  flexShrink: 0,
});

export const pointsValue = style([
  typography.body.b3,
  {
    color: vars.colors.blue80,
  },
]);
