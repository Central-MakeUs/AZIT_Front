import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 24,
  width: '100%',
  maxWidth: 220,
  margin: '0 auto',
  flex: 1,
});

export const iconTextContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
  width: 160,
});

export const emptyText = style([
  typography.body.b2,
  {
    color: vars.colors.gray60,
    textAlign: 'center',
  },
]);

export const button = style([
  typography.body.b2,
  {
    height: 'auto',
    padding: 10,
    backgroundColor: vars.colors.white,
    border: `1px solid ${vars.colors.blue80}`,
    borderRadius: 12,
    color: vars.colors.blue80,
  },
]);
