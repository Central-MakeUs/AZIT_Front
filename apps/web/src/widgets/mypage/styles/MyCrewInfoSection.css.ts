import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const card = style({
  width: '100%',
  backgroundColor: vars.colors.white,
  border: `1px solid ${vars.colors.gray10}`,
  borderRadius: 16,
});

export const cardHeader = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
  padding: '12px 16px',
});

export const avatar = style({
  width: 36,
  height: 36,
  borderRadius: '50%',
  backgroundColor: vars.colors.gray10,
  flexShrink: 0,
  objectFit: 'cover',
});

export const cardFooter = style({
  display: 'flex',
  borderTop: `1px solid ${vars.colors.gray10}`,
});

export const crewName = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    flexShrink: 0,
  },
]);

export const crewJoinInfo = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 44,
  gap: 6,
});

export const tabButton = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  gap: 6,
});

export const copyContent = style([
  crewJoinInfo,
  {
    borderRight: `1px solid ${vars.colors.gray10}`,
    color: vars.colors.gray70,
    flex: 1,
  },
]);

export const iconWrap = style({
  width: 16,
  height: 16,
});

export const copyIcon = style({
  color: vars.colors.gray40,
});

export const shareContent = style([
  crewJoinInfo,
  {
    color: vars.colors.blue60,
    flex: 1,
  },
]);

export const shareIcon = style({
  color: vars.colors.blue60,
});
